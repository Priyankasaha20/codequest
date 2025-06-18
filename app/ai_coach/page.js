"use client";
import React from "react";
import { useSession } from "next-auth/react";
import AuthenticatedLayout from "../../components/AuthenticatedLayout";
import AIInterviewCoachScreen from "@/components/screens/AIInterviewCoachScreen";

export default function AICoachPage() {
  const { status } = useSession();
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
      <AIInterviewCoachScreen />
    </AuthenticatedLayout>
  );
}
