import React from "react";
import AuthenticatedLayout from "../../components/AuthenticatedLayout";
import ProfileScreen from "@/components/screens/ProfileScreen";

export default function ProfilePage() {
  return (
    <AuthenticatedLayout>
      <ProfileScreen />
    </AuthenticatedLayout>
  );
}
