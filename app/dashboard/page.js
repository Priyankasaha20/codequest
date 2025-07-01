import React from "react";
import DashboardScreen from "../../components/screens/DashboardScreen";
import AuthenticatedLayout from "../../components/AuthenticatedLayout";

export default async function DashboardPage() {
  return (
    <AuthenticatedLayout>
      <DashboardScreen />
    </AuthenticatedLayout>
  );
}
