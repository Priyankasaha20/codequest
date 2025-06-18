"use client";
import React from "react";
import { BookOpen, CheckCircle, PlayCircle, Star } from "lucide-react";
import { motion } from "framer-motion";

const learningModules = [
  {
    id: 1,
    title: "Data Structures Mastery",
    description:
      "Learn arrays, linked lists, stacks, queues, trees, and graphs with interactive lessons and quizzes.",
    progress: 80,
    completed: false,
    badge: "Data Guru",
  },
  {
    id: 2,
    title: "Algorithms Bootcamp",
    description:
      "Master sorting, searching, recursion, dynamic programming, and more.",
    progress: 100,
    completed: true,
    badge: "Algo Ace",
  },
  {
    id: 3,
    title: "System Design Basics",
    description:
      "Understand the fundamentals of scalable system design and architecture.",
    progress: 45,
    completed: false,
    badge: null,
  },
  {
    id: 4,
    title: "Coding Interview Patterns",
    description:
      "Practice common interview patterns and problem-solving strategies.",
    progress: 60,
    completed: false,
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

const LearningScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-background p-6">
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl montserrat-bold text-onyx-700 mb-2 flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-claret-500" /> Learning Path
          </h1>
          <p className="text-onyx-500 montserrat-regular">
            Track your progress and continue your learning journey
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn-primary px-6 py-2 montserrat-semibold shadow-md hover:shadow-lg transition">
            My Certificates
          </button>
          <button className="btn-outline px-6 py-2 montserrat-semibold">
            Leaderboard
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {learningModules.map((module, i) => (
          <motion.div
            key={module.id}
            className={`card animate-fade-in shadow-xl hover:scale-[1.03] hover:shadow-2xl transition-transform duration-200 border-2 ${
              module.completed ? "border-tea-green-400" : "border-alabaster-200"
            }`}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={cardVariants}
          >
            <div className="card-content flex flex-col h-full">
              <div className="flex items-center mb-4">
                <BookOpen className="w-7 h-7 text-claret-500 mr-2" />
                <h2 className="text-xl montserrat-semibold text-onyx-700 flex-1">
                  {module.title}
                </h2>
                {module.completed && (
                  <CheckCircle
                    className="w-6 h-6 text-tea-green-600"
                    title="Completed"
                  />
                )}
                {module.badge && (
                  <span className="ml-2 px-2 py-1 bg-tea-green-100 text-tea-green-700 rounded text-xs flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    {module.badge}
                  </span>
                )}
              </div>
              <p className="text-onyx-600 mb-4 flex-1 montserrat-regular">
                {module.description}
              </p>
              <div className="mb-3">
                <div className="w-full bg-alabaster-200 rounded-full h-2">
                  <motion.div
                    className="bg-claret-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${module.progress}%` }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: 0.7,
                      delay: i * 0.1,
                      type: "spring",
                    }}
                    style={{ width: `${module.progress}%` }}
                  ></motion.div>
                </div>
                <div className="flex justify-between text-xs text-onyx-500 mt-1">
                  <span>{module.progress}% complete</span>
                  {module.completed && (
                    <span className="text-tea-green-600">Completed</span>
                  )}
                </div>
              </div>
              <button
                className={`btn-primary flex items-center justify-center mt-auto montserrat-semibold text-base ${
                  module.completed ? "opacity-60 cursor-not-allowed" : ""
                }`}
                disabled={module.completed}
              >
                <PlayCircle className="w-4 h-4 mr-2" />
                {module.completed ? "Completed" : "Continue Learning"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LearningScreen;
