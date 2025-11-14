"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const USER_STORAGE_KEY = "user";
const TOKEN_STORAGE_KEY = "token";

export interface User {
  _id: string;
  username: string;
  phone: string;
  roles: string[];
  addresses?: Array<{
    _id: string;
    name: string;
    province: string;
    city: string;
    street: string;
    postalCode: string;
  }>;
  createdAt: string;
  updatedAt: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (userData: User, token?: string) => void;
  logout: () => void;
  checkAuth: () => boolean;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated on component mount
  useEffect(() => {
    const checkUserAuth = () => {
      try {
        let storedUser = localStorage.getItem(USER_STORAGE_KEY);
        let token = localStorage.getItem(TOKEN_STORAGE_KEY);

        if (!storedUser || !token) {
          const legacyUser = localStorage.getItem("currentUser");
          const legacyToken = localStorage.getItem("authToken");

          if (legacyUser && legacyToken) {
            storedUser = legacyUser;
            token = legacyToken;
            localStorage.setItem(USER_STORAGE_KEY, legacyUser);
            localStorage.setItem(TOKEN_STORAGE_KEY, legacyToken);
            localStorage.removeItem("currentUser");
            localStorage.removeItem("authToken");
          }
        }

        if (storedUser && token) {
          const userData: User = JSON.parse(storedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        // Clear corrupted data
        localStorage.removeItem(USER_STORAGE_KEY);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserAuth();
  }, []);

  const login = (userData: User, token?: string) => {
    setUser(userData);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    const tokenToPersist = token ?? "mock-jwt-token"; // In real app, this comes from API
    localStorage.setItem(TOKEN_STORAGE_KEY, tokenToPersist);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    // Optional: Redirect to home page
    window.location.href = "/";
  };

  const checkAuth = (): boolean => {
    return !!user && !!localStorage.getItem(TOKEN_STORAGE_KEY);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    checkAuth,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};