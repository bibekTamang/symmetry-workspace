import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { type EnhancedStore } from "@reduxjs/toolkit";
import {
  logoutUser,
  updateAccessToken,
} from "../redux/features/auth/authSlice";
import type { ApiErrorResponse, RefreshResponse } from "../types/Api";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

interface QueueItem {
  resolve: (token: string) => void;
  reject: (error: AxiosError<ApiErrorResponse>) => void;
}

const AUTH_BYPASS_ENDPOINTS = [
  "/auth/login",
  "/auth/register",
  "/auth/refresh",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/request-otp",
  "/auth/validate-otp",
];
let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (
  error: AxiosError<ApiErrorResponse> | null,
  token: string | null = null,
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

export const setupInterceptors = (store: EnhancedStore) => {
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const state = store.getState() as ReturnType<typeof store.getState>;
      const token = state.auth.accessToken;

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ApiErrorResponse>) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      const isBypassEndpoint = AUTH_BYPASS_ENDPOINTS.some((endpoint) =>
        originalRequest.url?.includes(endpoint),
      );

      if (
        error.response?.status !== 401 ||
        originalRequest._retry ||
        isBypassEndpoint
      ) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err: AxiosError<ApiErrorResponse>) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        api
          .post<RefreshResponse>("/auth/refresh")
          .then(({ data }) => {
            const newAccessToken = data.accessToken;

            store.dispatch(updateAccessToken(newAccessToken));

            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            }

            processQueue(null, newAccessToken);
            resolve(api(originalRequest));
          })
          .catch((refreshError: AxiosError<ApiErrorResponse>) => {
            processQueue(refreshError, null);
            store.dispatch(logoutUser());
            reject(refreshError);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    },
  );
};
