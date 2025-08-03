import React from "react";
import PracticeHubScreen from "../../components/screens/PracticeHubScreen";
import AuthenticatedLayout from "../../components/AuthenticatedLayout";

export default function PracticeHubPage() {
  return (
    <AuthenticatedLayout>
      <PracticeHubScreen />
    </AuthenticatedLayout>
  );
}
