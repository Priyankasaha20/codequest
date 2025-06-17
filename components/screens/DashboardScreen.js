import React from "react";
import {
  Zap,
  CheckCircle,
  TrendingUp,
  Trophy,
  Play,
  Activity,
} from "lucide-react";

const DashboardScreen = ({ setCurrentScreen }) => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-onyx-500">Welcome back!</h1>
        <div className="text-sm text-onyx-600">
          Today: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-alabaster-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-onyx-600">Daily Streak</p>
              <p className="text-2xl font-bold text-claret-500">12</p>
            </div>
            <Zap className="w-8 h-8 text-tea-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-alabaster-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-onyx-600">Questions Solved</p>
              <p className="text-2xl font-bold text-claret-500">234</p>
            </div>
            <CheckCircle className="w-8 h-8 text-tea-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-alabaster-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-onyx-600">Success Rate</p>
              <p className="text-2xl font-bold text-claret-500">78%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-tea-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-alabaster-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-onyx-600">Rank</p>
              <p className="text-2xl font-bold text-claret-500">#47</p>
            </div>
            <Trophy className="w-8 h-8 text-tea-green-500" />
          </div>
        </div>
      </div>

      {/* Today's Challenge */}
      <div className="bg-white rounded-lg border border-alabaster-200 p-6">
        <h2 className="text-lg font-semibold text-onyx-500 mb-4">
          Today's Challenge
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-onyx-700 font-medium">
              Binary Tree Maximum Path Sum
            </p>
            <p className="text-sm text-onyx-600">
              Difficulty: Hard • Expected Time: 30 mins
            </p>
          </div>
          <button
            onClick={() => setCurrentScreen("daily")}
            className="bg-claret-500 hover:bg-claret-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Play size={16} className="mr-2" />
            Start
          </button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-alabaster-200 p-6">
          <h3 className="text-lg font-semibold text-onyx-500 mb-4">
            Continue Learning
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-alabaster-50 rounded-lg">
              <span className="text-onyx-700">Dynamic Programming</span>
              <span className="text-sm text-claret-500">3/8 complete</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-alabaster-50 rounded-lg">
              <span className="text-onyx-700">System Design</span>
              <span className="text-sm text-claret-500">1/5 complete</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-alabaster-200 p-6">
          <h3 className="text-lg font-semibold text-onyx-500 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <CheckCircle size={16} className="text-tea-green-500" />
              <span className="text-sm text-onyx-600">
                Completed "Two Sum" problem
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Trophy size={16} className="text-claret-500" />
              <span className="text-sm text-onyx-600">
                Achieved 7-day streak!
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Activity size={16} className="text-tea-green-500" />
              <span className="text-sm text-onyx-600">
                Practiced mock interview
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
