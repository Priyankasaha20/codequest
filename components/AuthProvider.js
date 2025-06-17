"use client";
import { SessionProvider } from "next-auth/react";
import { TimerProvider } from "../contexts/TimerContext";

export default function AuthProvider({ children }) {
  return (
    <SessionProvider>
      <TimerProvider>{children}</TimerProvider>
    </SessionProvider>
  );
}
