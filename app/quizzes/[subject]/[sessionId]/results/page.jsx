"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Clock,
  Award,
  TrendingUp,
  Target,
  BookOpen,
  ArrowLeft,
  BarChart3,
  RefreshCw,
  Share2,
  Trophy,
  Star,
  Zap,
  Brain,
  AlertCircle,
} from "lucide-react";

// Mock detailed results data
const mockResults = {
  "quiz_computer-networks_1735257266559_abc123": {
    subject: "Computer Networks",
    score: 8,
    totalQuestions: 10,
    percentage: 80,
    timeSpent: "12:45",
    completedAt: "2024-12-20T10:30:00Z",
    difficulty: "Medium",
    answers: [
      {
        questionId: 1,
        userAnswer: 0,
        correctAnswer: 0,
        isCorrect: true,
        timeSpent: 45,
      },
      {
        questionId: 2,
        userAnswer: 2,
        correctAnswer: 2,
        isCorrect: true,
        timeSpent: 62,
      },
      {
        questionId: 3,
        userAnswer: 1,
        correctAnswer: 2,
        isCorrect: false,
        timeSpent: 78,
      },
      {
        questionId: 4,
        userAnswer: 1,
        correctAnswer: 1,
        isCorrect: true,
        timeSpent: 55,
      },
      {
        questionId: 5,
        userAnswer: 0,
        correctAnswer: 0,
        isCorrect: true,
        timeSpent: 42,
      },
      {
        questionId: 6,
        userAnswer: 2,
        correctAnswer: 3,
        isCorrect: false,
        timeSpent: 95,
      },
      {
        questionId: 7,
        userAnswer: 3,
        correctAnswer: 3,
        isCorrect: true,
        timeSpent: 68,
      },
      {
        questionId: 8,
        userAnswer: 2,
        correctAnswer: 2,
        isCorrect: true,
        timeSpent: 51,
      },
      {
        questionId: 9,
        userAnswer: 0,
        correctAnswer: 0,
        isCorrect: true,
        timeSpent: 39,
      },
      {
        questionId: 10,
        userAnswer: 0,
        correctAnswer: 0,
        isCorrect: true,
        timeSpent: 33,
      },
    ],
    strengths: ["Network Protocols", "Basic Networking", "Cable Types"],
    weaknesses: ["Routing", "Network Topology"],
    recommendations: [
      "Review routing protocols and algorithms",
      "Study different network topologies in detail",
      "Practice more questions on network security",
    ],
    badge: "Good Performance",
    rank: "Top 25%",
  },
};

// Subject titles mapping
const subjectTitles = {
  "computer-networks": "Computer Networks",
  oop: "Object-Oriented Programming",
  os: "Operating Systems",
  dbms: "Database Management Systems",
};

export default function QuizResultsPage() {
  const params = useParams();
  const router = useRouter();
  const { subject, sessionId } = params;

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockData = mockResults[sessionId];
      if (mockData) {
        setResults(mockData);
      }
      setLoading(false);
    }, 1000);
  }, [sessionId]);

  const handleRetakeQuiz = () => {
    router.push(`/quizzes/${subject}`);
  };

  const handleBackToQuizzes = () => {
    router.push("/quizzes");
  };

  const getPerformanceColor = (percentage) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-red-600";
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-claret-500 mx-auto mb-4"></div>
          <h2 className="text-xl montserrat-bold text-onyx-700 mb-2">
            Loading Results...
          </h2>
          <p className="text-onyx-500">Analyzing your performance</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-xl montserrat-bold text-onyx-700 mb-2">
            Results Not Found
          </h2>
          <p className="text-onyx-500 mb-4">
            The quiz results could not be loaded
          </p>
          <button onClick={handleBackToQuizzes} className="btn-primary">
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBackToQuizzes}
            className="flex items-center space-x-2 text-onyx-600 hover:text-claret-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Quizzes</span>
          </button>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl montserrat-bold text-onyx-700 mb-2">
                  Quiz Results
                </h1>
                <p className="text-lg text-onyx-600">
                  {subjectTitles[subject]} •{" "}
                  {new Date(results.completedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <div
                  className={`text-4xl montserrat-bold ${getPerformanceColor(
                    results.percentage
                  )} mb-2`}
                >
                  {results.percentage}%
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm border ${getBadgeColor(
                    results.badge
                  )} montserrat-semibold`}
                >
                  {results.badge}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/50 rounded-xl p-4 text-center">
                <Target className="w-8 h-8 mx-auto mb-2 text-claret-500" />
                <div className="text-2xl montserrat-bold text-onyx-700 mb-1">
                  {results.score}/{results.totalQuestions}
                </div>
                <p className="text-sm text-onyx-500">Score</p>
              </div>
              <div className="bg-white/50 rounded-xl p-4 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl montserrat-bold text-onyx-700 mb-1">
                  {results.timeSpent}
                </div>
                <p className="text-sm text-onyx-500">Time Spent</p>
              </div>
              <div className="bg-white/50 rounded-xl p-4 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl montserrat-bold text-onyx-700 mb-1">
                  {results.rank}
                </div>
                <p className="text-sm text-onyx-500">Ranking</p>
              </div>
              <div className="bg-white/50 rounded-xl p-4 text-center">
                <Brain className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                <div className="text-2xl montserrat-bold text-onyx-700 mb-1">
                  {results.difficulty}
                </div>
                <p className="text-sm text-onyx-500">Difficulty</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {/* Question Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-alabaster-200"
            >
              <h3 className="text-xl montserrat-bold text-onyx-700 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Question Breakdown
              </h3>

              <div className="space-y-3">
                {results.answers.map((answer, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-alabaster-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm montserrat-medium text-onyx-700">
                          Question {index + 1}
                        </p>
                        <p className="text-xs text-onyx-500">
                          {answer.timeSpent}s
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-onyx-600">
                        {String.fromCharCode(65 + answer.userAnswer)} →{" "}
                        {String.fromCharCode(65 + answer.correctAnswer)}
                      </div>
                      {answer.isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Performance Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-alabaster-200"
            >
              <h3 className="text-xl montserrat-bold text-onyx-700 mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Performance Insights
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg montserrat-semibold text-green-600 mb-3 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Strengths
                  </h4>
                  <ul className="space-y-2">
                    {results.strengths.map((strength, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-onyx-700">
                          {strength}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg montserrat-semibold text-orange-600 mb-3 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Areas for Improvement
                  </h4>
                  <ul className="space-y-2">
                    {results.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-onyx-700">
                          {weakness}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-alabaster-200"
            >
              <h3 className="text-lg montserrat-bold text-onyx-700 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={handleRetakeQuiz}
                  className="w-full flex items-center justify-center space-x-2 bg-claret-500 text-white py-3 rounded-lg hover:bg-claret-600 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retake Quiz</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 bg-alabaster-100 text-onyx-700 py-3 rounded-lg hover:bg-alabaster-200 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Share Results</span>
                </button>
              </div>
            </motion.div>

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-alabaster-200"
            >
              <h3 className="text-lg montserrat-bold text-onyx-700 mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                Recommendations
              </h3>
              <ul className="space-y-3">
                {results.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-claret-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-onyx-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Achievement Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-claret-500 to-claret-600 text-white rounded-xl p-6 text-center"
            >
              <Trophy className="w-12 h-12 mx-auto mb-3" />
              <h3 className="text-lg montserrat-bold mb-2">
                Achievement Unlocked!
              </h3>
              <p className="text-sm opacity-90 mb-3">{results.badge}</p>
              <div className="text-2xl montserrat-bold">
                {results.percentage}% Score
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
