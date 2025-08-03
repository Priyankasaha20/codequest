"use client";
import React, { useEffect } from "react";
import { TimerProvider } from "../contexts/TimerContext";

export default function AuthProvider({ children }) {
  return (
    <>
      <TimerProvider>{children}</TimerProvider>
    </>
  );
}
