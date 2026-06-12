import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

// Extend AxiosRequestConfig to include our custom tracking property
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 1. Core Instance Configuration
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. In-Memory Token Vault
// This short-lived variable exists purely in JavaScript runtime memory (safe from XSS)
let memoryToken: string | null = null;

/**
 * Global setter to update the in-memory access token.
 * Called by AuthContext during login, boot initialization, and token rotation.
 */
export const setAuthToken = (token: string | null) => {
  memoryToken = token;
};

// 3. Concurrency Locking Variables
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

/**
 * Iterates through stashed requests and either re-runs them with the new token
 * or rejects them if the refresh cycle completely failed.
 */
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

// ==========================================
// 4. REQUEST INTERCEPTOR
// ==========================================
api.interceptors.request.use(
  (config) => {
    // If we have an access token living in application memory, inject it automatically
    if (memoryToken && config.headers) {
      config.headers.Authorization = `Bearer ${memoryToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ==========================================
// 5. RESPONSE INTERCEPTOR (The Guard Dog)
// ==========================================
api.interceptors.response.use(
  (response) => response, 
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    console.log("ORIGINAL REQUEST",originalRequest)

    // 1. Identify if the failing request is an auth setup route
    const isAuthRoute = 
      originalRequest?.url?.includes('auth/login') || 
      originalRequest?.url?.includes('auth/refresh');

    // 2. ONLY attempt a refresh if it's a 401 AND NOT a login/refresh route
    if (
      error.response?.status === 401 && 
      originalRequest && 
      !originalRequest._retry && 
      !isAuthRoute
    ) {
      
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        axios
          .post(
            `${api.defaults.baseURL}/api/v1/auth/refresh`,
            {},
            { withCredentials: true }
          )
          .then((res) => {
            const { accessToken } = res.data;
            setAuthToken(accessToken);
            processQueue(null, accessToken);
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }
            resolve(api(originalRequest));
          })
          .catch((refreshError) => {
            processQueue(refreshError, null);
            setAuthToken(null);
            window.dispatchEvent(new Event('auth-session-expired'));
            reject(refreshError);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    // Returns the original error straight back to the component forms or context wrappers
    return Promise.reject(error);
  }
);

