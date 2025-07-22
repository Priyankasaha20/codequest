"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  CheckCircle,
  PlayCircle,
  Star,
  MapPin,
  BookOpen,
  Target,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

const companyPreps = [
  {
    id: "google",
    company: "Google",
    title: "Google Interview Prep",
    description:
      "Practice real Google interview questions and company-specific tips.",
    logo: "🔍",
    questions: 45,
    subjectQuizzes: 8,
    completed: false,
    badge: "Google Guru",
    difficulty: "Hard",
    avgRating: 4.8,
    totalUsers: 12500,
    passRate: 78,
    tags: ["Algorithms", "System Design", "Leadership", "Data Structures"],
  },
  {
    id: "amazon",
    company: "Amazon",
    title: "Amazon Interview Prep",
    description:
      "Get ready for Amazon's leadership principles and coding rounds.",
    logo: "📦",
    questions: 38,
    subjectQuizzes: 6,
    completed: true,
    badge: "Amazon Ace",
    difficulty: "Medium",
    avgRating: 4.6,
    totalUsers: 9800,
    passRate: 82,
    tags: ["Leadership Principles", "Behavioral", "System Design", "Coding"],
  },
  {
    id: "microsoft",
    company: "Microsoft",
    title: "Microsoft Interview Prep",
    description:
      "Sharpen your skills for Microsoft interviews and system design.",
    logo: "🪟",
    questions: 42,
    subjectQuizzes: 7,
    completed: false,
    badge: null,
    difficulty: "Medium",
    avgRating: 4.7,
    totalUsers: 8900,
    passRate: 85,
    tags: ["System Design", "Coding", "Product", "Technical"],
  },
  {
    id: "meta",
    company: "Meta",
    title: "Meta Interview Prep",
    description:
      "Prepare for Meta's behavioral and technical interview process.",
    logo: "👥",
    questions: 36,
    subjectQuizzes: 5,
    completed: false,
    badge: null,
    difficulty: "Hard",
    avgRating: 4.5,
    totalUsers: 7600,
    passRate: 72,
    tags: ["Behavioral", "System Design", "Product Sense", "Coding"],
  },
  {
    id: "apple",
    company: "Apple",
    title: "Apple Interview Prep",
    description:
      "Master Apple's unique interview style and technical challenges.",
    logo: "🍎",
    questions: 33,
    subjectQuizzes: 6,
    completed: false,
    badge: null,
    difficulty: "Hard",
    avgRating: 4.4,
    totalUsers: 6200,
    passRate: 70,
    tags: ["Design", "Technical", "Product", "Innovation"],
  },
  {
    id: "netflix",
    company: "Netflix",
    title: "Netflix Interview Prep",
    description:
      "Prepare for Netflix's culture-focused and technical interviews.",
    logo: "🎬",
    questions: 28,
    subjectQuizzes: 4,
    completed: false,
    badge: null,
    difficulty: "Medium",
    avgRating: 4.3,
    totalUsers: 4800,
    passRate: 79,
    tags: ["Culture", "Technical", "Product", "Analytics"],
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

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "bg-green-100 text-green-700";
    case "Medium":
      return "bg-yellow-100 text-yellow-700";
    case "Hard":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const CompanyPrepScreen = () => {
  const router = useRouter();

  const handleStartPrep = (companyId) => {
    router.push(`/company-prep/${companyId}/roadmap`);
  };

  return (
    <div className="min-h-screen bg-gradient-background p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl montserrat-bold text-onyx-700 mb-2 flex items-center">
              <Building2 className="w-8 h-8 mr-3 text-claret-500" />
              Company Prep
            </h1>
            <p className="text-onyx-500 montserrat-regular">
              Practice company-specific interview questions and track your
              progress
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-claret-500" />
                <span className="text-sm montserrat-semibold text-onyx-700">
                  {companyPreps.length} Companies
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companyPreps.map((prep, index) => (
          <motion.div
            key={prep.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-alabaster-200 hover:border-claret-300 transition-all duration-300 hover:shadow-xl hover:shadow-claret-500/10"
            whileHover={{ y: -5 }}
          >
            <div className="flex flex-col h-full">
              {/* Company Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{prep.logo}</div>
                  <div>
                    <h2 className="text-lg montserrat-bold text-onyx-700 group-hover:text-claret-600 transition-colors">
                      {prep.company}
                    </h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <span
                        className={`px-2 py-1 rounded-full text-xs montserrat-semibold ${getDifficultyColor(
                          prep.difficulty
                        )}`}
                      >
                        {prep.difficulty}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs text-onyx-500">
                          {prep.avgRating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {prep.completed && (
                    <CheckCircle className="w-5 h-5 text-tea-green-600" />
                  )}
                  {prep.badge && (
                    <span className="px-2 py-1 bg-tea-green-100 text-tea-green-700 rounded-full text-xs flex items-center">
                      <Award className="w-3 h-3 mr-1" />
                      {prep.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-onyx-600 mb-4 flex-1 montserrat-regular leading-relaxed">
                {prep.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-alabaster-50 rounded-lg p-3 text-center">
                  <div className="text-lg montserrat-bold text-claret-600">
                    {prep.questions}
                  </div>
                  <div className="text-xs text-onyx-500 montserrat-medium">
                    Questions
                  </div>
                </div>
                <div className="bg-alabaster-50 rounded-lg p-3 text-center">
                  <div className="text-lg montserrat-bold text-blue-600">
                    {prep.subjectQuizzes}
                  </div>
                  <div className="text-xs text-onyx-500 montserrat-medium">
                    Quizzes
                  </div>
                </div>
                <div className="bg-alabaster-50 rounded-lg p-3 text-center">
                  <div className="text-lg montserrat-bold text-green-600">
                    {prep.passRate}%
                  </div>
                  <div className="text-xs text-onyx-500 montserrat-medium">
                    Pass Rate
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {prep.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-claret-100 text-claret-700 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {prep.tags.length > 3 && (
                    <span className="px-2 py-1 bg-alabaster-100 text-onyx-500 rounded text-xs">
                      +{prep.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* User Stats */}
              <div className="flex items-center justify-between mb-4 text-xs text-onyx-500">
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{prep.totalUsers.toLocaleString()} users</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{prep.passRate}% success rate</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleStartPrep(prep.id)}
                className={`w-full bg-gradient-to-r from-claret-500 to-claret-600 text-white py-3 rounded-lg hover:from-claret-600 hover:to-claret-700 transition-all duration-200 flex items-center justify-center space-x-2 group-hover:shadow-lg montserrat-semibold ${
                  prep.completed ? "opacity-75" : ""
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>{prep.completed ? "View Roadmap" : "Start Roadmap"}</span>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CompanyPrepScreen;
