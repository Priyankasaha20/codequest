"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const TimerContext = createContext();

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};

export const TimerProvider = ({ children }) => {
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
    timer,
    setTimer,
    timerActive,
    setTimerActive,
    formatTime,
    resetTimer,
  };

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
};
