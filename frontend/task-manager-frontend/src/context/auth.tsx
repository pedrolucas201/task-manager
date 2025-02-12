import { createContext, useState, ReactNode } from "react";
import api from "../api";

interface AuthContextType {
  token: string | null;
  refreshToken: string | null;
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  refreshToken: null,
  setToken: () => {},
  setRefreshToken: () => {},
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refreshToken")
  );

  const login = async (credentials: { username: string; password: string }) => {
    try {
      const response = await api.post("token/", credentials);
      setToken(response.data.access);
      setRefreshToken(response.data.refresh);
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider
      value={{ token, refreshToken, setToken, setRefreshToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
