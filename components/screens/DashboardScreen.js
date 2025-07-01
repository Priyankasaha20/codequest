"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Zap,
  CheckCircle,
  TrendingUp,
  Trophy,
  Play,
  Activity,
} from "lucide-react";
import { AuthContext } from "../../contexts/AuthContext";

const DashboardScreen = () => {
  const router = useRouter();
  const { user, isLoading } = useContext(AuthContext);

  // While user data is loading
  if (isLoading || !user) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-claret-500"></div>
      </div>
    );
  }

  const userData = user.user;

  return (
    <div className="min-h-screen bg-gradient-background p-6">
      <div className="mb-8">
        <h1 className="text-3xl montserrat-bold text-onyx-700 mb-2">
          Welcome back, {userData.name}!
        </h1>
        <div className="text-sm text-onyx-600 space-y-1">
          <div>Email: {userData.email}</div>
          <div>
            Member since: {new Date(userData.createdAt).toLocaleDateString()}
          </div>
          <div>Email verified: {userData.emailVerified ? "Yes" : "No"}</div>
          <div>Today: {new Date().toLocaleDateString()}</div>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="card-content flex items-center justify-between">
            <div>
              <p className="text-sm montserrat-medium text-onyx-600">
                Daily Streak
              </p>
              <p className="text-2xl montserrat-bold text-claret-500">12</p>
            </div>
            <Zap className="w-8 h-8 text-tea-green-500" />
          </div>
        </div>
        <div className="card">
          <div className="card-content flex items-center justify-between">
            <div>
              <p className="text-sm montserrat-medium text-onyx-600">
                Questions Solved
              </p>
              <p className="text-2xl montserrat-bold text-claret-500">234</p>
            </div>
            <CheckCircle className="w-8 h-8 text-tea-green-500" />
          </div>
        </div>
        <div className="card">
          <div className="card-content flex items-center justify-between">
            <div>
              <p className="text-sm montserrat-medium text-onyx-600">
                Success Rate
              </p>
              <p className="text-2xl montserrat-bold text-claret-500">78%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-tea-green-500" />
          </div>
        </div>
        <div className="card">
          <div className="card-content flex items-center justify-between">
            <div>
              <p className="text-sm montserrat-medium text-onyx-600">Rank</p>
              <p className="text-2xl montserrat-bold text-claret-500">#47</p>
            </div>
            <Trophy className="w-8 h-8 text-tea-green-500" />
          </div>
        </div>
      </div>
      {/* Today's Challenge */}
      <div className="card mb-8">
        <div className="card-content">
          <h2 className="text-lg montserrat-semibold text-onyx-500 mb-4">
            Today's Challenge
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-onyx-700 montserrat-medium">
                Binary Tree Maximum Path Sum
              </p>
              <p className="text-sm text-onyx-600">
                Difficulty: Hard • Expected Time: 30 mins
              </p>
            </div>
            <Link
              href="/daily-challenge"
              className="btn-primary flex items-center"
            >
              <Play size={16} className="mr-2" />
              Start
            </Link>
          </div>
        </div>
      </div>
      {/* Quick Links */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg montserrat-semibold text-onyx-700 mb-4">
              Continue Learning
            </h3>
          </div>
          <div className="card-content space-y-3">
            <div className="flex items-center justify-between p-3 bg-alabaster-50 rounded-lg">
              <span className="text-onyx-700 montserrat-medium">
                Dynamic Programming
              </span>
              <span className="text-sm text-claret-500">3/8 complete</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-alabaster-50 rounded-lg">
              <span className="text-onyx-700 montserrat-medium">
                System Design
              </span>
              <span className="text-sm text-claret-500">1/5 complete</span>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg montserrat-semibold text-onyx-700 mb-4">
              Recent Activity
            </h3>
          </div>
          <div className="card-content space-y-3">
            <div className="flex items-center space-x-3">
              <CheckCircle size={16} className="text-tea-green-500" />
              <span className="text-sm text-onyx-600 montserrat-regular">
                Completed "Two Sum" problem
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Trophy size={16} className="text-claret-500" />
              <span className="text-sm text-onyx-600 montserrat-regular">
                Achieved 7-day streak!
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Activity size={16} className="text-tea-green-500" />
              <span className="text-sm text-onyx-600 montserrat-regular">
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
