"use client";
import React from "react";
import { Bot, MessageCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const aiFeatures = [
  {
    icon: <Sparkles className="w-6 h-6 text-claret-500" />,
    title: "Mock Interviews",
    desc: "Practice coding and behavioral interviews with an AI interviewer.",
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-tea-green-600" />,
    title: "Instant Feedback",
    desc: "Get real-time feedback and improvement tips on your answers.",
  },
  {
    icon: <Bot className="w-6 h-6 text-blue-500" />,
    title: "Adaptive Questions",
    desc: "Questions adapt to your skill level and progress.",
  },
];

const AIInterviewCoachScreen = () => (
  <div className="min-h-screen bg-gradient-background p-6">
    <div className="mb-8">
      <h1 className="text-3xl montserrat-bold text-onyx-700 mb-2 flex items-center gap-2">
        <Bot className="w-8 h-8 text-claret-500" /> AI Interview Coach
      </h1>
      <p className="text-onyx-500 montserrat-regular">
        Practice interviews, get instant feedback, and boost your confidence
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {aiFeatures.map((f, i) => (
        <motion.div
          key={f.title}
          className="card animate-fade-in shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 60 }}
        >
          <div className="card-content flex flex-col items-center text-center">
            <div className="mb-3">{f.icon}</div>
            <div className="text-lg montserrat-semibold text-onyx-700 mb-1">
              {f.title}
            </div>
            <div className="text-sm text-onyx-600 montserrat-regular">
              {f.desc}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
    <div className="mt-12 max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
      <h2 className="text-xl montserrat-semibold text-onyx-700 mb-4">
        Start a Mock Interview
      </h2>
      <button className="btn-primary px-8 py-3 text-lg montserrat-semibold flex items-center justify-center mx-auto">
        <Bot className="w-5 h-5 mr-2" /> Start Interview
      </button>
    </div>
  </div>
);

export default AIInterviewCoachScreen;
