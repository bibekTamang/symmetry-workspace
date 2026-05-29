import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { AuthContextType, AuthUser } from "../types/AuthTypes";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem("symmetry_token");
        const storedUser = localStorage.getItem("symmetry_user");

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));

          // Optional: Configure your global API client (Axios/Fetch default headers) here
          // axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
      } catch (error) {
        console.error("Failed to parse stored authentication state", error);
        localStorage.removeItem("symmetry_token");
        localStorage.removeItem("symmetry_user");
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (newToken: string, authUser: AuthUser) => {
    setToken(newToken);
    setUser(authUser);
    localStorage.setItem("symmetry_token", newToken);
    localStorage.setItem("symmetry_user", JSON.stringify(authUser));

    // axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("symmetry_token");
    localStorage.removeItem("symmetry_user");

    // delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
