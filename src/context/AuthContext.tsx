import React, { createContext, useState, useEffect } from "react";
import { isTokenExpired } from "../utils/checkToken";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (data: any) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<any>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  // 🔄 Restore authentication on page refresh
  useEffect(() => {
    if (!token) return;

    if (isTokenExpired(token)) {
      logout();
      return;
    }

    // If user missing but token exists, decode later if needed
  }, []);

  // 🏪 Save token to localStorage whenever it updates
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // 🏪 Save user to localStorage whenever it updates
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // 🔐 Login: Save token + user
  const login = (data: any) => {
    setToken(data.token);
    setUser(data.user);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  // 🚪 Logout: Clear token + user
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
