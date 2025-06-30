"use client";
import React from "react";
import { useSession } from "next-auth/react";
import AuthenticatedLayout from "../../components/AuthenticatedLayout";
import AICoachScreen from "../../components/screens/AICoachScreen";

export default function AICoachPage() {
  const status = "authenticated"; // hardcoded for this example

  if (status === "loading")
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-claret-500"></div>
      </div>
    );

  if (status === "unauthenticated") {
    if (typeof window !== "undefined") window.location.href = "/login";
    return null;
  }

  return (
    <AuthenticatedLayout>
      <AICoachScreen />
    </AuthenticatedLayout>
  );
}
