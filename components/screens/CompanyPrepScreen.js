"use client";
import React from "react";
import { Building2, CheckCircle, PlayCircle, Star } from "lucide-react";

const companyPreps = [
  {
    id: 1,
    company: "Google",
    title: "Google Interview Prep",
    description:
      "Practice real Google interview questions and company-specific tips.",
    questions: 20,
    completed: false,
    badge: "Google Guru",
  },
  {
    id: 2,
    company: "Amazon",
    title: "Amazon Interview Prep",
    description:
      "Get ready for Amazon's leadership principles and coding rounds.",
    questions: 18,
    completed: true,
    badge: "Amazon Ace",
  },
  {
    id: 3,
    company: "Microsoft",
    title: "Microsoft Interview Prep",
    description:
      "Sharpen your skills for Microsoft interviews and system design.",
    questions: 15,
    completed: false,
    badge: null,
  },
  {
    id: 4,
    company: "Meta",
    title: "Meta Interview Prep",
    description:
      "Prepare for Meta's behavioral and technical interview process.",
    questions: 16,
    completed: false,
    badge: null,
  },
];

const getCompanyColor = (company) => {
  switch (company) {
    case "Google":
      return "bg-gradient-to-r from-yellow-400 via-red-400 to-blue-500 text-white";
    case "Amazon":
      return "bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-600 text-white";
    case "Microsoft":
      return "bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 text-white";
    case "Meta":
      return "bg-gradient-to-r from-blue-500 via-pink-400 to-purple-500 text-white";
    default:
      return "bg-alabaster-100 text-onyx-700";
  }
};

const CompanyPrepScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-background p-6">
      <div className="mb-8">
        <h1 className="text-3xl montserrat-bold text-onyx-700 mb-2">
          Company Prep
        </h1>
        <p className="text-onyx-500 montserrat-regular">
          Practice company-specific interview questions and track your progress
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {companyPreps.map((prep) => (
          <div
            key={prep.id}
            className="card animate-fade-in shadow-xl hover:scale-[1.025] hover:shadow-2xl transition-transform duration-200"
          >
            <div className="card-content flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg mr-3 text-xl font-bold ${getCompanyColor(
                    prep.company
                  )}`}
                >
                  <Building2 className="w-6 h-6" />
                </div>
                <h2 className="text-lg montserrat-semibold text-onyx-700 flex-1">
                  {prep.title}
                </h2>
                {prep.completed && (
                  <CheckCircle
                    className="w-6 h-6 text-tea-green-600"
                    title="Completed"
                  />
                )}
                {prep.badge && (
                  <span className="ml-2 px-2 py-1 bg-tea-green-100 text-tea-green-700 rounded text-xs flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    {prep.badge}
                  </span>
                )}
              </div>
              <p className="text-onyx-600 mb-3 flex-1 montserrat-regular">
                {prep.description}
              </p>
              <div className="mb-3 flex items-center justify-between text-xs text-onyx-500 montserrat-medium">
                <span className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-full font-semibold text-xs ${getCompanyColor(
                      prep.company
                    )}`}
                  >
                    {prep.company}
                  </span>
                  <span className="bg-alabaster-200 px-2 py-1 rounded-full">
                    {prep.questions} questions
                  </span>
                </span>
              </div>
              <button
                className={`btn-primary flex items-center justify-center mt-auto montserrat-semibold text-base shadow-md hover:shadow-lg transition ${
                  prep.completed ? "opacity-60 cursor-not-allowed" : ""
                }`}
                disabled={prep.completed}
              >
                <PlayCircle className="w-4 h-4 mr-2" />
                {prep.completed ? "Completed" : "Start Prep"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyPrepScreen;
