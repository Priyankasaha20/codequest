"use client";
import React from "react";
import { BarChart3, TrendingUp, CheckCircle, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";

const analyticsData = [
  {
    label: "Problems Solved",
    value: 234,
    icon: <CheckCircle className="w-6 h-6 text-tea-green-600" />,
    color: "bg-tea-green-100 text-tea-green-700",
    trend: "+12 this week",
  },
  {
    label: "Success Rate",
    value: "78%",
    icon: <TrendingUp className="w-6 h-6 text-claret-500" />,
    color: "bg-claret-100 text-claret-700",
    trend: "+3% this month",
  },
  {
    label: "Avg. Time per Problem",
    value: "23 min",
    icon: <Clock className="w-6 h-6 text-onyx-600" />,
    color: "bg-onyx-100 text-onyx-700",
    trend: "-2 min improvement",
  },
  {
    label: "Current Streak",
    value: "12 days",
    icon: <Award className="w-6 h-6 text-yellow-500" />,
    color: "bg-yellow-100 text-yellow-700",
    trend: "Keep it up!",
  },
];

const chartVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, type: "spring", stiffness: 60 },
  }),
};

const AnalyticsScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-background p-6">
      <div className="mb-8">
        <h1 className="text-3xl montserrat-bold text-onyx-700 mb-2 flex items-center gap-2">
          <BarChart3 className="w-8 h-8 text-claret-500" /> Analytics & Insights
        </h1>
        <p className="text-onyx-500 montserrat-regular">
          Visualize your progress and performance trends
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {analyticsData.map((stat, i) => (
          <motion.div
            key={stat.label}
            className={`card animate-fade-in shadow-xl ${stat.color}`}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={chartVariants}
          >
            <div className="card-content flex flex-col items-center text-center">
              <div className="mb-2">{stat.icon}</div>
              <div className="text-2xl montserrat-bold mb-1">{stat.value}</div>
              <div className="text-sm montserrat-medium text-onyx-700 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-onyx-500">{stat.trend}</div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Example animated bar chart */}
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
        <h2 className="text-xl montserrat-semibold text-onyx-700 mb-6">
          Problems Solved Over Time
        </h2>
        <div className="flex items-end gap-4 h-48">
          {[40, 60, 80, 120, 100, 140, 180].map((val, i) => (
            <motion.div
              key={i}
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: `${val}px`, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.1, type: "spring" }}
              className="flex-1 bg-claret-500 rounded-t-lg"
              style={{ minWidth: 24 }}
            >
              <span className="block text-xs text-center mt-2 text-onyx-700">
                {val}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-onyx-500 mt-4">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsScreen;
