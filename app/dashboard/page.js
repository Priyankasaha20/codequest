import React from "react";
import DashboardScreen from "../../components/screens/DashboardScreen";
import AuthenticatedLayout from "../../components/AuthenticatedLayout";

export default async function DashboardPage() {
  const data = await fetchUser();
  return (
    <AuthenticatedLayout>
      <DashboardScreen user={data} />
    </AuthenticatedLayout>
  );
}

async function fetchUser() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("connect.sid");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: sessionCookie ? `connect.sid=${sessionCookie.value}` : "",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return await res.json();
}
