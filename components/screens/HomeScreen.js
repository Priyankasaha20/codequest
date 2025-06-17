import React from "react";
import { Brain, Target, Users } from "lucide-react";

const HomeScreen = ({ setIsLoggedIn, setCurrentScreen }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-alabaster-100 to-timberwolf-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-onyx-500 mb-6">
            Master Your{" "}
            <span className="text-claret-500">Placement Journey</span>
          </h1>
          <p className="text-xl text-onyx-600 mb-8 max-w-2xl mx-auto">
            Comprehensive preparation platform with AI-powered coaching, daily
            challenges, and company-specific prep
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setIsLoggedIn(true);
                setCurrentScreen("dashboard");
              }}
              className="bg-claret-500 hover:bg-claret-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Get Started
            </button>
            <button className="border border-onyx-300 text-onyx-600 hover:bg-onyx-50 px-8 py-3 rounded-lg font-medium transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-alabaster-200">
            <Brain className="w-12 h-12 text-claret-500 mb-4" />
            <h3 className="text-xl font-semibold text-onyx-500 mb-2">
              AI Interview Coach
            </h3>
            <p className="text-onyx-600">
              Practice with AI-powered mock interviews and get instant feedback
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-alabaster-200">
            <Target className="w-12 h-12 text-claret-500 mb-4" />
            <h3 className="text-xl font-semibold text-onyx-500 mb-2">
              Company-Specific Prep
            </h3>
            <p className="text-onyx-600">
              Targeted preparation for your dream companies with curated
              questions
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-alabaster-200">
            <Users className="w-12 h-12 text-claret-500 mb-4" />
            <h3 className="text-xl font-semibold text-onyx-500 mb-2">
              Multiplayer Arena
            </h3>
            <p className="text-onyx-600">
              Compete with peers in real-time coding challenges and quizzes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
