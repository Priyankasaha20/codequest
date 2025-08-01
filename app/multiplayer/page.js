"use client";
import React from "react";
import { useSession } from "next-auth/react";
import AuthenticatedLayout from "../../components/AuthenticatedLayout";
import MultiplayerArenaScreen from "@/components/screens/MultiplayerArenaScreen";

export default function MultiplayerPage() {
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
      <MultiplayerArenaScreen />
    </AuthenticatedLayout>
  );
}
