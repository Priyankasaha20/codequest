"use client";
import React from "react";
import { BookOpen, CheckCircle, PlayCircle, Star } from "lucide-react";
import { motion } from "framer-motion";

const subjectQuizzes = [
  {
    id: 1,
    subject: "Data Structures",
    title: "Arrays & Linked Lists Quiz",
    description: "Test your knowledge of arrays and linked lists with 15 MCQs.",
    questions: 15,
    completed: true,
    score: 13,
    badge: "Array Ace",
  },
  {
    id: 2,
    subject: "Algorithms",
    title: "Sorting & Searching Quiz",
    description: "Challenge yourself on sorting and searching algorithms.",
    questions: 12,
    completed: false,
    score: null,
    badge: null,
  },
  {
    id: 3,
    subject: "System Design",
    title: "Basics of System Design Quiz",
    description: "Assess your understanding of scalable system design.",
    questions: 10,
    completed: false,
    score: null,
    badge: null,
  },
  {
    id: 4,
    subject: "Programming Patterns",
    title: "Patterns & Paradigms Quiz",
    description: "Quiz on common programming patterns and paradigms.",
    questions: 14,
    completed: true,
    score: 14,
    badge: "Pattern Pro",
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
  return (
    <div className="min-h-screen bg-gradient-background p-6">
      <div className="mb-8">
        <h1 className="text-3xl montserrat-bold text-onyx-700 mb-2">
          Subject Quizzes
        </h1>
        <p className="text-onyx-500 montserrat-regular">
          Test your subject knowledge with curated quizzes and track your
          progress
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjectQuizzes.map((quiz, i) => (
          <motion.div
            key={quiz.id}
            className="card animate-fade-in shadow-xl hover:scale-[1.025] hover:shadow-2xl transition-transform duration-200"
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={cardVariants}
          >
            <div className="card-content flex flex-col h-full">
              <div className="flex items-center mb-3">
                <BookOpen className="w-7 h-7 text-claret-500 mr-2" />
                <h2 className="text-lg montserrat-semibold text-onyx-700 flex-1">
                  {quiz.title}
                </h2>
                {quiz.completed && (
                  <CheckCircle
                    className="w-6 h-6 text-tea-green-600"
                    title="Completed"
                  />
                )}
                {quiz.badge && (
                  <span className="ml-2 px-2 py-1 bg-tea-green-100 text-tea-green-700 rounded text-xs flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    {quiz.badge}
                  </span>
                )}
              </div>
              <p className="text-onyx-600 mb-2 flex-1 montserrat-regular">
                {quiz.description}
              </p>
              <div className="mb-2 text-xs text-onyx-500 montserrat-medium">
                <span>{quiz.subject}</span> •{" "}
                <span>{quiz.questions} questions</span>
              </div>
              {quiz.completed && quiz.score !== null && (
                <div className="mb-2 text-sm text-tea-green-700 font-semibold montserrat-semibold">
                  Score: {quiz.score}/{quiz.questions}
                </div>
              )}
              <button
                className={`btn-primary flex items-center justify-center mt-auto montserrat-semibold text-base ${
                  quiz.completed ? "opacity-60 cursor-not-allowed" : ""
                }`}
                disabled={quiz.completed}
              >
                <PlayCircle className="w-4 h-4 mr-2" />
                {quiz.completed ? "Completed" : "Start Quiz"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SubjectQuizzesScreen;
