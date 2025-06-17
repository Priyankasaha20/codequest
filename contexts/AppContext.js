"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [timer, setTimer] = useState(600); // 10 minutes for daily challenge
  const [timerActive, setTimerActive] = useState(false);

  // Timer effect for daily challenge
  useEffect(() => {
    let interval = null;
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const resetTimer = () => {
    setTimer(600);
    setTimerActive(false);
  };

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    timer,
    setTimer,
    timerActive,
    setTimerActive,
    formatTime,
    resetTimer,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
