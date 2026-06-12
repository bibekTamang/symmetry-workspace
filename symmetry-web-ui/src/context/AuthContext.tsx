import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  useLayoutEffect,
} from "react";
import type { AuthContextType, AuthUser } from "../types/AuthTypes";
import { api, setAuthToken } from "../lib/axios";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const login = (token: string, userData: AuthUser) => {
    setAccessToken(token);
    setAuthToken(token);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setAccessToken(null);
      setAuthToken(null);
      setUser(null);
    }
  };

  useLayoutEffect(() => {
    const checkSession = async () => {
      try {
        const response = await api.post("/auth/refresh");
        const { accessToken, user } = response.data;
        console.log("SESSION DATA", response.data);
        login(accessToken, user);
      } catch {
        setAuthToken(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  useEffect(() => {
    const handleSessionExpired = () => {
      setAccessToken(null);
      setAuthToken(null);
      setUser(null);
    };

    window.addEventListener("auth-session-expired", handleSessionExpired);
    return () =>
      window.removeEventListener("auth-session-expired", handleSessionExpired);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, accessToken, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
