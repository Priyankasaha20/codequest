"use client";
import React from "react";
import AuthenticatedLayout from "../../components/AuthenticatedLayout";
import LearningScreen from "@/components/screens/LearningScreen";

export default function LearningPathPage() {
  const status = "authenticated"; // hardcoded for this example
  if (status === "loading")
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (status === "unauthenticated") {
    if (typeof window !== "undefined") window.location.href = "/login";
    return null;
  }
  return (
    <AuthenticatedLayout>
      <LearningScreen />
    </AuthenticatedLayout>
  );
}
