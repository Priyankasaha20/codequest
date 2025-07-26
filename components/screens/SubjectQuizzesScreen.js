"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  CheckCircle,
  PlayCircle,
  Star,
  Settings,
  Clock,
  TrendingUp,
  Calendar,
  Award,
  BarChart3,
  RefreshCw,
  Filter,
  Search,
  ChevronRight,
  Trophy,
  Target,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const subjectQuizzes = [
  {
    id: "Networking",
    subject: "Computer Networks",
    title: "Computer Networks Quiz",
    description:
      "Test your knowledge of networking concepts, protocols, and architecture.",
    icon: "🌐",
    totalQuestions: 50,
    completed: false,
    score: null,
    badge: null,
  },
  {
    id: "OOPS",
    subject: "Object-Oriented Programming",
    title: "OOP Concepts Quiz",
    description:
      "Challenge yourself on OOP principles, inheritance, polymorphism, and more.",
    icon: "🔧",
    totalQuestions: 45,
    completed: true,
    score: 38,
    badge: "OOP Master",
  },
  {
    id: "OS",
    subject: "Operating Systems",
    title: "Operating Systems Quiz",
    description:
      "Assess your understanding of OS concepts, processes, and memory management.",
    icon: "💻",
    totalQuestions: 40,
    completed: false,
    score: null,
    badge: null,
  },
  {
    id: "DBMS",
    subject: "Database Management Systems",
    title: "DBMS Quiz",
    description:
      "Test your knowledge of database design, SQL, and database management.",
    icon: "🗃️",
    totalQuestions: 55,
    completed: false,
    score: null,
    badge: null,
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 40 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: i * 0.12, type: "spring", stiffness: 60 },
  }),
};

const SubjectQuizzesScreen = () => {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [questionCount, setQuestionCount] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("subjects"); // "subjects" or "recent"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const handleStartQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setShowModal(true);
  };


  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedQuiz(null);
    setQuestionCount(10);
  };

  const handleRetakeQuiz = (attempt) => {
    const quiz = subjectQuizzes.find((q) => q.id === attempt.subjectId);
    if (quiz) {
      setSelectedQuiz(quiz);
      setQuestionCount(attempt.totalQuestions);
      setShowModal(true);
    }
  };

  const handleViewResults = (attempt) => {
    router.push(`/quizzes/${attempt.subjectId}/${attempt.sessionId}/results`);
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Excellent":
        return "bg-green-100 text-green-800 border-green-200";
      case "Good Performance":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Needs Improvement":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPerformanceColor = (percentage) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const filteredAttempts = recentAttempts.filter((attempt) => {
    const matchesSearch = attempt.subject
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" || attempt.subjectId === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredQuizzes = subjectQuizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-background p-6">
      {/* Modern Header with Glassmorphism Effect */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-claret-500/10 to-tea-green-500/10 rounded-2xl blur-xl"></div>
        <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl montserrat-bold text-onyx-700 mb-2 flex items-center">
                <Trophy className="w-8 h-8 mr-3 text-claret-500" />
                Subject Quizzes
              </h1>
              <p className="text-onyx-600 montserrat-regular">
                Test your knowledge and track your progress across different
                subjects
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-claret-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span className="montserrat-semibold">Level Up</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-alabaster-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("subjects")}
              className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 flex items-center justify-center space-x-2 ${
                activeTab === "subjects"
                  ? "bg-white text-claret-600 shadow-sm"
                  : "text-onyx-600 hover:text-claret-600"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="montserrat-semibold">All Subjects</span>
            </button>
            <button
              onClick={() => setActiveTab("recent")}
              className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 flex items-center justify-center space-x-2 ${
                activeTab === "recent"
                  ? "bg-white text-claret-600 shadow-sm"
                  : "text-onyx-600 hover:text-claret-600"
              }`}
            >
              <Clock className="w-4 h-4" />
              <span className="montserrat-semibold">Recent Attempts</span>
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-alabaster-200"
          >
            <div className="flex items-center justify-between mb-2">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <span className="text-2xl montserrat-bold text-onyx-700">
                {recentAttempts.length}
              </span>
            </div>
            <p className="text-sm text-onyx-600 montserrat-semibold">
              Quizzes Completed
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-alabaster-200"
          >
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <span className="text-2xl montserrat-bold text-onyx-700">
                {Math.round(
                  recentAttempts.reduce(
                    (acc, attempt) => acc + attempt.percentage,
                    0
                  ) / recentAttempts.length || 0
                )}
                %
              </span>
            </div>
            <p className="text-sm text-onyx-600 montserrat-semibold">
              Average Score
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-alabaster-200"
          >
            <div className="flex items-center justify-between mb-2">
              <Zap className="w-8 h-8 text-claret-500" />
              <span className="text-2xl montserrat-bold text-onyx-700">
                {recentAttempts.length > 0
                  ? Math.max(...recentAttempts.map((a) => a.percentage))
                  : 0}
                %
              </span>
            </div>
            <p className="text-sm text-onyx-600 montserrat-semibold">
              Best Score
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-alabaster-200"
          >
            <div className="flex items-center justify-between mb-2">
              <Award className="w-8 h-8 text-blue-500" />
              <span className="text-2xl montserrat-bold text-onyx-700">
                {recentAttempts.filter((a) => a.percentage >= 80).length}
              </span>
            </div>
            <p className="text-sm text-onyx-600 montserrat-semibold">
              Excellent Scores
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-onyx-400 w-4 h-4" />
          <input
            type="text"
            placeholder={
              activeTab === "subjects"
                ? "Search subjects..."
                : "Search quiz attempts..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/80 backdrop-blur-sm border border-alabaster-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-claret-500/50 focus:border-claret-500"
          />
        </div>
        {activeTab === "recent" && (
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-alabaster-300 rounded-lg hover:border-claret-300 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
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
                  All Subjects
                </button>
                {subjectQuizzes.map((quiz) => (
                  <button
                    key={quiz.id}
                    onClick={() => {
                      setSelectedFilter(quiz.id);
                      setShowFilters(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-alabaster-50"
                  >
                    {quiz.subject}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "subjects" ? (
          <motion.div
            key="subjects"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filteredQuizzes.map((quiz, i) => (
              <motion.div
                key={quiz.id}
                className="group relative bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-alabaster-200 hover:border-claret-300 transition-all duration-300 hover:shadow-2xl hover:shadow-claret-500/10"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={{
                  hidden: { opacity: 0, scale: 0.95, y: 40 },
                  visible: (i) => ({
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      delay: i * 0.1,
                      type: "spring",
                      stiffness: 100,
                    },
                  }),
                }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-claret-500/5 to-tea-green-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{quiz.icon}</div>
                      <div>
                        <h3 className="text-lg montserrat-bold text-onyx-700 group-hover:text-claret-600 transition-colors">
                          {quiz.title}
                        </h3>
                        <p className="text-sm text-onyx-500 montserrat-medium">
                          {quiz.subject}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {quiz.completed && (
                        <CheckCircle className="w-5 h-5 text-tea-green-600" />
                      )}
                      {quiz.badge && (
                        <span className="px-2 py-1 bg-tea-green-100 text-tea-green-700 rounded-full text-xs flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          {quiz.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-onyx-600 mb-4 montserrat-regular leading-relaxed">
                    {quiz.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-onyx-500">
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{quiz.totalQuestions} questions</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>~{Math.ceil(quiz.totalQuestions * 1.5)} min</span>
                      </div>
                    </div>
                    {quiz.completed && quiz.score !== null && (
                      <div className="flex items-center space-x-1 text-sm text-tea-green-700 montserrat-semibold">
                        <Award className="w-4 h-4" />
                        <span>
                          {quiz.score}/{quiz.totalQuestions}
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleStartQuiz(quiz)}
                    className="w-full bg-gradient-to-r from-claret-500 to-claret-600 text-white py-3 rounded-lg hover:from-claret-600 hover:to-claret-700 transition-all duration-200 flex items-center justify-center space-x-2 group-hover:shadow-lg montserrat-semibold"
                  >
                    <PlayCircle className="w-5 h-5" />
                    <span>Start Quiz</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="recent"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {filteredAttempts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl montserrat-semibold text-onyx-700 mb-2">
                  No quiz attempts found
                </h3>
                <p className="text-onyx-500 montserrat-regular">
                  Start taking quizzes to see your progress here!
                </p>
              </div>
            ) : (
              filteredAttempts.map((attempt, index) => (
                <motion.div
                  key={attempt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-alabaster-200 hover:border-claret-300 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">
                        {subjectQuizzes.find((q) => q.id === attempt.subjectId)
                          ?.icon || "📚"}
                      </div>
                      <div>
                        <h3 className="text-lg montserrat-semibold text-onyx-700">
                          {attempt.subject}
                        </h3>
                        <p className="text-sm text-onyx-500 montserrat-medium">
                          {getTimeAgo(attempt.completedAt)} •{" "}
                          {attempt.difficulty}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm border ${getBadgeColor(
                          attempt.badge
                        )} montserrat-semibold`}
                      >
                        {attempt.badge}
                      </span>
                      <div
                        className={`text-2xl montserrat-bold ${getPerformanceColor(
                          attempt.percentage
                        )}`}
                      >
                        {attempt.percentage}%
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-alabaster-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 text-onyx-600 mb-1">
                        <Target className="w-4 h-4" />
                        <span className="text-sm montserrat-medium">Score</span>
                      </div>
                      <div className="text-lg montserrat-bold text-onyx-700">
                        {attempt.score}/{attempt.totalQuestions}
                      </div>
                    </div>
                    <div className="bg-alabaster-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 text-onyx-600 mb-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm montserrat-medium">Time</span>
                      </div>
                      <div className="text-lg montserrat-bold text-onyx-700">
                        {attempt.timeSpent}
                      </div>
                    </div>
                    <div className="bg-alabaster-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 text-onyx-600 mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm montserrat-medium">
                          Performance
                        </span>
                      </div>
                      <div
                        className={`text-lg montserrat-bold ${getPerformanceColor(
                          attempt.percentage
                        )}`}
                      >
                        {attempt.percentage}%
                      </div>
                    </div>
                    <div className="bg-alabaster-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 text-onyx-600 mb-1">
                        <BookOpen className="w-4 h-4" />
                        <span className="text-sm montserrat-medium">
                          Questions
                        </span>
                      </div>
                      <div className="text-lg montserrat-bold text-onyx-700">
                        {attempt.totalQuestions}
                      </div>
                    </div>
                  </div>

                  {attempt.improvementAreas &&
                    attempt.improvementAreas.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm text-onyx-600 montserrat-medium mb-2">
                          Areas for improvement:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {attempt.improvementAreas.map((area, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleRetakeQuiz(attempt)}
                      className="flex items-center space-x-2 px-4 py-2 bg-claret-500 text-white rounded-lg hover:bg-claret-600 transition-colors montserrat-semibold"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Retake Quiz</span>
                    </button>
                    <button
                      onClick={() => handleViewResults(attempt)}
                      className="flex items-center space-x-2 px-4 py-2 bg-alabaster-100 text-onyx-700 rounded-lg hover:bg-alabaster-200 transition-colors montserrat-semibold"
                    >
                      <BarChart3 className="w-4 h-4" />
                      <span>View Results</span>
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quiz Configuration Modal */}
      <AnimatePresence>
        {showModal && selectedQuiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full mx-4 border border-white/20"
            >
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">{selectedQuiz.icon}</div>
                <h3 className="text-2xl montserrat-bold text-onyx-700 mb-2">
                  {selectedQuiz.subject}
                </h3>
                <p className="text-onyx-600 montserrat-regular">
                  Configure your quiz settings
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm montserrat-semibold text-onyx-700 mb-3">
                    Number of Questions
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {[5, 10, 15, 20, 25].map((count) => (
                      <button
                        key={count}
                        onClick={() => setQuestionCount(count)}
                        className={`py-2 px-3 rounded-lg text-sm montserrat-semibold transition-all duration-200 ${
                          questionCount === count
                            ? "bg-claret-500 text-white shadow-lg"
                            : "bg-alabaster-100 text-onyx-600 hover:bg-alabaster-200"
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-claret-50 to-tea-green-50 rounded-xl p-4">
                  <h4 className="text-sm montserrat-semibold text-onyx-700 mb-3 flex items-center">
                    <Zap className="w-4 h-4 mr-2" />
                    Quiz Preview
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-claret-500" />
                      <span className="text-onyx-600">
                        {questionCount} Questions
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="text-onyx-600">
                        ~{Math.ceil(questionCount * 1.5)} min
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-green-500" />
                      <span className="text-onyx-600">Multiple Choice</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span className="text-onyx-600">Timed Quiz</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-3 border border-alabaster-300 text-onyx-600 rounded-lg hover:bg-alabaster-50 transition-colors montserrat-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmStart}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-claret-500 to-claret-600 text-white rounded-lg hover:from-claret-600 hover:to-claret-700 transition-all duration-200 montserrat-semibold shadow-lg"
                  >
                    Start Quiz
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubjectQuizzesScreen;
