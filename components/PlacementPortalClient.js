"use client";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import HomeScreen from "./screens/HomeScreen";
import DashboardScreen from "./screens/DashboardScreen";
import DailyChallengeScreen from "./screens/DailyChallengeScreen";
import PracticeHubScreen from "./screens/PracticeHubScreen";
import { navigation, screens } from "../data/navigationData";

const PlacementPortalClient = () => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const renderCurrentScreen = () => {
    if (!isLoggedIn && currentScreen !== "home") {
      return (
        <HomeScreen
          setIsLoggedIn={setIsLoggedIn}
          setCurrentScreen={setCurrentScreen}
        />
      );
    }

    switch (currentScreen) {
      case "home":
        return (
          <HomeScreen
            setIsLoggedIn={setIsLoggedIn}
            setCurrentScreen={setCurrentScreen}
          />
        );
      case "dashboard":
        return <DashboardScreen setCurrentScreen={setCurrentScreen} />;
      case "daily":
        return (
          <DailyChallengeScreen
            timer={timer}
            timerActive={timerActive}
            setTimerActive={setTimerActive}
            formatTime={formatTime}
          />
        );
      case "practice":
        return <PracticeHubScreen />;
      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-onyx-500 mb-4">
              {screens[currentScreen]}
            </h1>
            <div className="bg-white rounded-lg border border-alabaster-200 p-8 text-center">
              <p className="text-onyx-600">This screen is under development.</p>
              <p className="text-sm text-onyx-500 mt-2">
                Features for {screens[currentScreen]} will be available soon.
              </p>
            </div>
          </div>
        );
    }
  };

  if (!isLoggedIn && currentScreen === "home") {
    return (
      <HomeScreen
        setIsLoggedIn={setIsLoggedIn}
        setCurrentScreen={setCurrentScreen}
      />
    );
  }

  return (
    <div className="flex h-screen bg-alabaster-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-25 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        navigation={navigation}
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-auto">{renderCurrentScreen()}</main>
      </div>
    </div>
  );
};

export default PlacementPortalClient;
