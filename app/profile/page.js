import React from "react";
import { cookies } from "next/headers";
import AuthenticatedLayout from "../../components/AuthenticatedLayout";
import ProfileScreen from "@/components/screens/ProfileScreen";

export default async function ProfilePage() {
  const profileData = await fetchProfileData();

  return (
    <AuthenticatedLayout>
      <ProfileScreen profileData={profileData} />
    </AuthenticatedLayout>
  );
}

async function fetchProfileData() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("connect.sid")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/profile`,
    {
      cache: "no-store",
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
