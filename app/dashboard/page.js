import React from "react";
import { cookies } from "next/headers";
import DashboardScreen from "@/components/screens/DashboardScreen";

export default async function DashboardPage() {
  const usersData = await fetchProfileData();
  return <DashboardScreen usersData={usersData} />;
}
// Data fetching
async function fetchProfileData() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("connect.sid")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/profile`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(sessionId ? { Cookie: `connect.sid=${sessionId}` } : {}),
      },
    }
  );
  if (!res.ok) {
    return {
      error: "Failed to fetch profile data",
      status: res.status,
    };
  }
  return res.json();
}
