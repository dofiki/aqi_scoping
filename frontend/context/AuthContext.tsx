"use client";

import React, { createContext, useState, useEffect, useCallback } from "react";
import { SignupPayload, LoginPayload } from "@/types/auth";
import { useRouter } from "next/navigation";
import { getDashboardApi, loginApi, signupApi } from "@/lib/api/auth.api";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginPayload) => Promise<void>;
  signup: (data: SignupPayload) => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

// create context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

// create Auth Provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Check Auth
  const checkAuth = useCallback(async () => {
    // Read the token from localStorage
    const token =
      typeof window !== undefined ? localStorage.getItem("accessToken") : null;

    // No token → user not logged in
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      // Validate it with the backend (getDashboardApi)
      const response = await getDashboardApi();
      // Set user state if valid
      setUser({
        id: "",
        username: response.data.username,
        email: response.data.email,
      });
    } catch {
      // Otherwise clear token and sets user to null
      localStorage.removeItem("accessToken");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // login
  const login = async (data: LoginPayload) => {
    try {
      // Reset error & start loading
      setError(null);
      setIsLoading(true);
      // Call backend login API
      const response = await loginApi(data);
      // Store token in localStorage
      localStorage.setItem("accessToken", response.data.accessToken);
      // Set user state
      setUser({
        id: response.data._id,
        username: response.data.username,
        email: response.data.email,
      });
      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      const error = err as Error & {
        response?: { data?: { message?: string } };
      };
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  // signup
  const signup = async (data: SignupPayload) => {
    try {
      setError(null);
      setIsLoading(true);
      // signup
      await signupApi(data);
      // After signup, automatically log in
      await login({ email: data.email, password: data.password });
    } catch (err) {
      const error = err as Error & {
        response?: { data?: { message?: string } };
      };
      const errorMessage =
        error.response?.data?.message || "Signup failed. Please try again.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  // logout
  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    router.push("/login");
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    error,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
