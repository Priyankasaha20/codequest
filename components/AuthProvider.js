"use client";
import { TimerProvider } from "../contexts/TimerContext";

export default function AuthProvider({ children }) {
  return (
    <>
      <TimerProvider>{children}</TimerProvider>
    </>
  );
}
