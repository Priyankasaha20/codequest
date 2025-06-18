'use client'
import React from "react";
import AuthenticatedLayout from "../../components/AuthenticatedLayout";
import CompanyPrepScreen from "@/components/screens/CompanyPrepScreen";

export default function CompanyPrepPage() {
  return (
    <AuthenticatedLayout>
      <CompanyPrepScreen />
    </AuthenticatedLayout>
  );
}
