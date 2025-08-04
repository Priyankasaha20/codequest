import React from "react";
import ProblemSolverScreen from "../../../../components/screens/ProblemSolverScreen";

export default async function ProblemPage({ params }) {
  const { problemName } = await params;

  return <ProblemSolverScreen problemName={problemName} />;
}
