import { useState, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import toast from "react-hot-toast";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to logout");
    }
    setIsAuthenticated(false);
  };
  const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/me", {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Not Authenticated!");

      const data = await res.json();
      setIsAuthenticated(true);
      setUser(data);
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
