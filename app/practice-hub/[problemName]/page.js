import React from "react";
import ProblemSolverScreen from "../../../components/screens/ProblemSolverScreen";
import AuthenticatedLayout from "../../../components/AuthenticatedLayout";

export default async function ProblemPage({ params }) {
  const { problemName } = await params;

  return (
    <AuthenticatedLayout>
      <ProblemSolverScreen problemName={problemName} />
    </AuthenticatedLayout>
  );
}
