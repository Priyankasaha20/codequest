"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, PlayCircle, Clock, Trophy, Target } from "lucide-react";
import { motion } from "framer-motion";

const subjectQuizzes = [
  {
    id: "Networking",
    subject: "Computer Networks",
    title: "Computer Networks Quiz",
    description:
      "Test your knowledge of networking concepts, protocols, and architecture.",
    icon: "🌐",
    totalQuestions: 50,
  },
  {
    id: "OOPS",
    subject: "Object-Oriented Programming",
    title: "OOP Concepts Quiz",
    description:
      "Challenge yourself on OOP principles, inheritance, polymorphism, and more.",
    icon: "🔧",
    totalQuestions: 45,
  },
  {
    id: "OS",
    subject: "Operating Systems",
    title: "Operating Systems Quiz",
    description:
      "Assess your understanding of OS concepts, processes, and memory management.",
    icon: "💻",
    totalQuestions: 40,
  },
  {
    id: "DBMS",
    subject: "Database Management Systems",
    title: "DBMS Quiz",
    description:
      "Test your knowledge of database design, SQL, and database management.",
    icon: "🗃️",
    totalQuestions: 55,
  },
];

const SubjectQuizzesScreen = () => {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [questionCount, setQuestionCount] = useState(10);
  const [showModal, setShowModal] = useState(false);

  const handleStartQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setShowModal(true);
  };

  const handleConfirmStart = () => {
    if (selectedQuiz) {
      // Navigate to the quiz page with 'new' as sessionId to start a new quiz
      router.push(`/quizzes/${selectedQuiz.id}/new?count=${questionCount}`);
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedQuiz(null);
    setQuestionCount(10);
  };

  return (
    <div className="min-h-screen bg-gradient-background p-6">
      {/* Header */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-claret-500/10 to-tea-green-500/10 rounded-2xl blur-xl"></div>
        <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
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
          </div>
        </div>
      </div>

      {/* Quiz Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjectQuizzes.map((quiz, i) => (
          <motion.div
            key={quiz.id}
            className="group relative bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-alabaster-200 hover:border-claret-300 transition-all duration-300 hover:shadow-2xl hover:shadow-claret-500/10"
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ y: -5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-claret-500/5 to-tea-green-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
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

              <p className="text-onyx-600 mb-4 montserrat-regular leading-relaxed">
                {quiz.description}
              </p>

              <div className="flex items-center space-x-4 text-sm text-onyx-500 mb-4">
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{quiz.totalQuestions} questions</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>~{Math.ceil(quiz.totalQuestions * 1.5)} min</span>
                </div>
              </div>

              <button
                onClick={() => handleStartQuiz(quiz)}
                className="w-full bg-gradient-to-r from-claret-500 to-claret-600 text-white py-3 rounded-lg hover:from-claret-600 hover:to-claret-700 transition-all duration-200 flex items-center justify-center space-x-2 montserrat-semibold"
              >
                <PlayCircle className="w-5 h-5" />
                <span>Start Quiz</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quiz Configuration Modal */}
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
                  <Target className="w-4 h-4 mr-2" />
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
    </div>
  );
};

export default SubjectQuizzesScreen;
