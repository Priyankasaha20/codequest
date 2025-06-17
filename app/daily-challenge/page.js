import React from "react";
import DailyChallengeScreen from "../../components/screens/DailyChallengeScreen";
import AuthenticatedLayout from "../../components/AuthenticatedLayout";

export default function DailyChallengePage() {
  return (
    <AuthenticatedLayout>
      <DailyChallengeScreen />
    </AuthenticatedLayout>
  );
}
