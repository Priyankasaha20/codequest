"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Target,
  Clock,
  Star,
  CheckCircle,
  PlayCircle,
  TrendingUp,
  Users,
  Award,
  MapPin,
  Zap,
  Brain,
  Code,
  FileText,
  BarChart3,
  ChevronRight,
  Filter,
  Search,
} from "lucide-react";

// Mock data for company-specific questions and quizzes
const companyData = {
  google: {
    name: "Google",
    logo: "🔍",
    color: "from-blue-500 to-red-500",
    questions: [
      {
        id: 1,
        title: "Two Sum Problem",
        difficulty: "Easy",
        category: "Arrays",
        topic: "Data Structures",
        timeEstimate: "15 min",
        completed: true,
        description:
          "Find two numbers in an array that add up to a target sum.",
      },
      {
        id: 2,
        title: "Binary Tree Traversal",
        difficulty: "Medium",
        category: "Trees",
        topic: "Data Structures",
        timeEstimate: "25 min",
        completed: false,
        description: "Implement in-order, pre-order, and post-order traversal.",
      },
      {
        id: 3,
        title: "System Design: URL Shortener",
        difficulty: "Hard",
        category: "System Design",
        topic: "System Design",
        timeEstimate: "45 min",
        completed: false,
        description: "Design a URL shortening service like bit.ly.",
      },
      {
        id: 4,
        title: "Google's PageRank Algorithm",
        difficulty: "Hard",
        category: "Algorithms",
        topic: "Algorithms",
        timeEstimate: "60 min",
        completed: false,
        description: "Understand and implement the PageRank algorithm.",
      },
      {
        id: 5,
        title: "Leadership Principles",
        difficulty: "Medium",
        category: "Behavioral",
        topic: "Leadership",
        timeEstimate: "30 min",
        completed: true,
        description: "Discuss Google's leadership principles and values.",
      },
    ],
    quizzes: [
      {
        id: "google-algorithms",
        title: "Google Algorithms Quiz",
        subject: "Algorithms",
        description:
          "Test your knowledge of algorithms commonly asked at Google.",
        questions: 15,
        difficulty: "Hard",
        timeEstimate: "30 min",
        completed: false,
        score: null,
      },
      {
        id: "google-system-design",
        title: "Google System Design Quiz",
        subject: "System Design",
        description: "Practice system design concepts for Google interviews.",
        questions: 12,
        difficulty: "Hard",
        timeEstimate: "25 min",
        completed: true,
        score: 10,
      },
      {
        id: "google-data-structures",
        title: "Google Data Structures Quiz",
        subject: "Data Structures",
        description: "Master data structures for Google technical interviews.",
        questions: 20,
        difficulty: "Medium",
        timeEstimate: "35 min",
        completed: false,
        score: null,
      },
    ],
  },
  amazon: {
    name: "Amazon",
    logo: "📦",
    color: "from-orange-500 to-yellow-500",
    questions: [
      {
        id: 1,
        title: "Leadership Principles Deep Dive",
        difficulty: "Medium",
        category: "Behavioral",
        topic: "Leadership",
        timeEstimate: "45 min",
        completed: false,
        description: "Master Amazon's 16 leadership principles with examples.",
      },
      {
        id: 2,
        title: "Dynamic Programming",
        difficulty: "Hard",
        category: "Algorithms",
        topic: "Algorithms",
        timeEstimate: "50 min",
        completed: false,
        description: "Solve complex DP problems commonly asked at Amazon.",
      },
      {
        id: 3,
        title: "AWS Architecture Design",
        difficulty: "Hard",
        category: "System Design",
        topic: "System Design",
        timeEstimate: "60 min",
        completed: true,
        description: "Design scalable systems using AWS services.",
      },
    ],
    quizzes: [
      {
        id: "amazon-leadership",
        title: "Amazon Leadership Principles Quiz",
        subject: "Leadership",
        description:
          "Test your understanding of Amazon's leadership principles.",
        questions: 16,
        difficulty: "Medium",
        timeEstimate: "25 min",
        completed: true,
        score: 14,
      },
      {
        id: "amazon-algorithms",
        title: "Amazon Algorithms Quiz",
        subject: "Algorithms",
        description: "Practice algorithm problems for Amazon interviews.",
        questions: 18,
        difficulty: "Hard",
        timeEstimate: "40 min",
        completed: false,
        score: null,
      },
    ],
  },
  microsoft: {
    name: "Microsoft",
    logo: "🪟",
    color: "from-blue-500 to-green-500",
    questions: [
      {
        id: 1,
        title: "Azure Cloud Architecture",
        difficulty: "Hard",
        category: "System Design",
        topic: "Cloud",
        timeEstimate: "55 min",
        completed: false,
        description: "Design cloud solutions using Microsoft Azure.",
      },
      {
        id: 2,
        title: "Graph Algorithms",
        difficulty: "Medium",
        category: "Algorithms",
        topic: "Algorithms",
        timeEstimate: "35 min",
        completed: true,
        description: "Implement graph traversal and shortest path algorithms.",
      },
    ],
    quizzes: [
      {
        id: "microsoft-azure",
        title: "Microsoft Azure Quiz",
        subject: "Cloud Computing",
        description: "Test your Azure knowledge for Microsoft interviews.",
        questions: 20,
        difficulty: "Medium",
        timeEstimate: "30 min",
        completed: false,
        score: null,
      },
    ],
  },
  meta: {
    name: "Meta",
    logo: "👥",
    color: "from-blue-500 to-purple-500",
    questions: [
      {
        id: 1,
        title: "React Performance Optimization",
        difficulty: "Medium",
        category: "Frontend",
        topic: "React",
        timeEstimate: "40 min",
        completed: false,
        description: "Optimize React applications for better performance.",
      },
      {
        id: 2,
        title: "Social Media System Design",
        difficulty: "Hard",
        category: "System Design",
        topic: "System Design",
        timeEstimate: "60 min",
        completed: false,
        description: "Design a social media platform like Facebook.",
      },
    ],
    quizzes: [
      {
        id: "meta-react",
        title: "Meta React Quiz",
        subject: "Frontend Development",
        description: "Test your React knowledge for Meta interviews.",
        questions: 15,
        difficulty: "Medium",
        timeEstimate: "25 min",
        completed: false,
        score: null,
      },
    ],
  },
  apple: {
    name: "Apple",
    logo: "🍎",
    color: "from-gray-500 to-blue-500",
    questions: [
      {
        id: 1,
        title: "iOS Development Patterns",
        difficulty: "Medium",
        category: "Mobile",
        topic: "iOS",
        timeEstimate: "45 min",
        completed: false,
        description: "Master iOS development patterns and best practices.",
      },
    ],
    quizzes: [
      {
        id: "apple-ios",
        title: "Apple iOS Quiz",
        subject: "Mobile Development",
        description: "Test your iOS knowledge for Apple interviews.",
        questions: 12,
        difficulty: "Medium",
        timeEstimate: "20 min",
        completed: false,
        score: null,
      },
    ],
  },
  netflix: {
    name: "Netflix",
    logo: "🎬",
    color: "from-red-500 to-black",
    questions: [
      {
        id: 1,
        title: "Microservices Architecture",
        difficulty: "Hard",
        category: "System Design",
        topic: "Architecture",
        timeEstimate: "50 min",
        completed: false,
        description:
          "Design microservices architecture for streaming platforms.",
      },
    ],
    quizzes: [
      {
        id: "netflix-architecture",
        title: "Netflix Architecture Quiz",
        subject: "System Architecture",
        description: "Test your knowledge of Netflix's architecture.",
        questions: 10,
        difficulty: "Hard",
        timeEstimate: "20 min",
        completed: false,
        score: null,
      },
    ],
  },
};

export default function CompanyRoadmapPage() {
  const params = useParams();
  const router = useRouter();
  const { company } = params;

  const [activeTab, setActiveTab] = useState("questions");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const companyInfo = companyData[company];

  if (!companyInfo) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl montserrat-bold text-onyx-700 mb-4">
            Company Not Found
          </h1>
          <button
            onClick={() => router.push("/company-prep")}
            className="btn-primary"
          >
            Back to Company Prep
          </button>
        </div>
      </div>
    );
  }

  const handleBackToCompanyPrep = () => {
    router.push("/company-prep");
  };

  const handleStartQuestion = (questionId) => {
    router.push(`/practice-hub/${company}-${questionId}`);
  };

  const handleStartQuiz = (quizId) => {
    router.push(`/quizzes/${quizId}`);
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

  const filteredQuestions = companyInfo.questions.filter((q) => {
    const matchesSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" || q.difficulty === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredQuizzes = companyInfo.quizzes.filter((q) => {
    const matchesSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" || q.difficulty === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBackToCompanyPrep}
            className="flex items-center space-x-2 text-onyx-600 hover:text-claret-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Company Prep</span>
          </button>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-claret-500/10 to-tea-green-500/10 rounded-2xl blur-xl"></div>
            <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{companyInfo.logo}</div>
                  <div>
                    <h1 className="text-3xl montserrat-bold text-onyx-700 mb-2">
                      {companyInfo.name} Interview Roadmap
                    </h1>
                    <p className="text-onyx-600 montserrat-regular">
                      Complete preparation guide for {companyInfo.name}{" "}
                      interviews
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl montserrat-bold text-claret-600">
                      {companyInfo.questions.length}
                    </div>
                    <div className="text-sm text-onyx-500">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl montserrat-bold text-blue-600">
                      {companyInfo.quizzes.length}
                    </div>
                    <div className="text-sm text-onyx-500">Quizzes</div>
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex space-x-1 bg-alabaster-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab("questions")}
                  className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 flex items-center justify-center space-x-2 ${
                    activeTab === "questions"
                      ? "bg-white text-claret-600 shadow-sm"
                      : "text-onyx-600 hover:text-claret-600"
                  }`}
                >
                  <Code className="w-4 h-4" />
                  <span className="montserrat-semibold">
                    Practice Questions
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("quizzes")}
                  className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 flex items-center justify-center space-x-2 ${
                    activeTab === "quizzes"
                      ? "bg-white text-claret-600 shadow-sm"
                      : "text-onyx-600 hover:text-claret-600"
                  }`}
                >
                  <Brain className="w-4 h-4" />
                  <span className="montserrat-semibold">Subject Quizzes</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-onyx-400 w-4 h-4" />
            <input
              type="text"
              placeholder={
                activeTab === "questions"
                  ? "Search questions..."
                  : "Search quizzes..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/80 backdrop-blur-sm border border-alabaster-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-claret-500/50 focus:border-claret-500"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-alabaster-300 rounded-lg hover:border-claret-300 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Difficulty</span>
            </button>
            {showFilters && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-alabaster-200 py-2 z-10">
                <button
                  onClick={() => {
                    setSelectedFilter("all");
                    setShowFilters(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-alabaster-50"
                >
                  All Difficulties
                </button>
                {["Easy", "Medium", "Hard"].map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => {
                      setSelectedFilter(difficulty);
                      setShowFilters(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-alabaster-50"
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "questions" ? (
            <motion.div
              key="questions"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {filteredQuestions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-alabaster-200 hover:border-claret-300 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg montserrat-semibold text-onyx-700">
                          {question.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs montserrat-semibold ${getDifficultyColor(
                            question.difficulty
                          )}`}
                        >
                          {question.difficulty}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {question.category}
                        </span>
                      </div>
                      <p className="text-onyx-600 montserrat-regular mb-3">
                        {question.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-onyx-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{question.timeEstimate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FileText className="w-4 h-4" />
                          <span>{question.topic}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {question.completed && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                      <button
                        onClick={() => handleStartQuestion(question.id)}
                        className="bg-claret-500 text-white px-4 py-2 rounded-lg hover:bg-claret-600 transition-colors flex items-center space-x-2"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>{question.completed ? "Review" : "Start"}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="quizzes"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredQuizzes.map((quiz, index) => (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-alabaster-200 hover:border-claret-300 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg montserrat-semibold text-onyx-700">
                          {quiz.title}
                        </h3>
                        {quiz.completed && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      <p className="text-onyx-600 montserrat-regular mb-3">
                        {quiz.description}
                      </p>
                      <div className="flex items-center space-x-2 mb-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs montserrat-semibold ${getDifficultyColor(
                            quiz.difficulty
                          )}`}
                        >
                          {quiz.difficulty}
                        </span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                          {quiz.subject}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-onyx-500">
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{quiz.questions} questions</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{quiz.timeEstimate}</span>
                        </div>
                      </div>
                      {quiz.completed && quiz.score !== null && (
                        <div className="mt-2 text-sm text-green-600 montserrat-semibold">
                          Score: {quiz.score}/{quiz.questions}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleStartQuiz(quiz.id)}
                    className="w-full bg-gradient-to-r from-claret-500 to-claret-600 text-white py-3 rounded-lg hover:from-claret-600 hover:to-claret-700 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Brain className="w-4 h-4" />
                    <span>{quiz.completed ? "Retake Quiz" : "Start Quiz"}</span>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
