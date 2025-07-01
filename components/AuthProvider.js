"use client";
import React, { useEffect } from "react";
import { TimerProvider } from "../contexts/TimerContext";
import { AuthContext } from "../contexts/AuthContext";
import { useAuth } from "../hooks/useAuth";

export default function AuthProvider({ children }) {
  const { isLoading, error, user, fetchUser } = useAuth();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider value={{ isLoading, error, user, fetchUser }}>
      <TimerProvider>{children}</TimerProvider>
    </AuthContext.Provider>
  );
}
