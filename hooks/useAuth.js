import { useState, useCallback } from "react";
import {
  loginService,
  registerService,
  meService,
} from "../lib/services/authService";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const login = async (data) => {
    setIsLoading(true);
    setError(null);
    const result = await loginService(data);
    setIsLoading(false);
    if (!result.success) {
      setError(result.error);
      return false;
    }
    return true;
  };

  const register = async (data) => {
    setIsLoading(true);
    setError(null);
    const result = await registerService(data);
    setIsLoading(false);
    if (!result.success) {
      setError(result.error);
      return false;
    }
    return true;
  };

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const result = await meService();
    setIsLoading(false);
    if (!result.success) {
      setError(result.error);
      return null;
    }
    setUser(result.data);
    return result.data;
  }, []);

  return {
    isLoading,
    error,
    login,
    register,
    user,
    fetchUser,
  };
}
