import React from "react";
import AuthenticatedLayout from "../../../components/DashboardLayout";

export default function CompaniesPage() {
  return (
    <AuthenticatedLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-onyx-500 mb-4">Company Prep</h1>
        <div className="bg-white rounded-lg border border-alabaster-200 p-8 text-center">
          <p className="text-onyx-600">This screen is under development.</p>
          <p className="text-sm text-onyx-500 mt-2">
            Features for Company Prep will be available soon.
          </p>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
