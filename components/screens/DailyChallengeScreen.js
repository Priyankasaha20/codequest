"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";
import { useTimer } from "../../contexts/TimerContext";

const DailyChallengeScreen = () => {
  // hardcode session and status for this example
  const session = {
    user: {
      name: "John Doe",
      email: "john@example.com",
    },
  };
  const status = "authenticated"; // or "loading", "unauthenticated"

  
  const router = useRouter();
  const { timer, timerActive, setTimerActive, formatTime } = useTimer();

  // While NextAuth is checking session
  if (status === "loading") {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-claret-500"></div>
      </div>
    );
  }

  // If no session, redirect to login
  if (!session) {
    router.push("/login");
    return null;
  }
  return (
    <div className="min-h-screen bg-gradient-background p-6">
      <div className="max-w-4xl mx-auto card">
        <div className="card-content">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl montserrat-bold text-onyx-700">
              Daily Challenge
            </h1>
            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center px-3 py-1 rounded-full ${
                  timerActive
                    ? "bg-claret-100 text-claret-700"
                    : "bg-alabaster-100 text-onyx-600"
                }`}
              >
                <Clock size={16} className="mr-2" />
                {formatTime(timer)}
              </div>
              <button
                onClick={() => setTimerActive(!timerActive)}
                className={`px-4 py-2 rounded-lg montserrat-semibold text-base transition ${
                  timerActive
                    ? "bg-claret-500 hover:bg-claret-600 text-white"
                    : "bg-tea-green-500 hover:bg-tea-green-600 text-white"
                }`}
              >
                {timerActive ? "Pause" : "Start"}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl montserrat-semibold text-onyx-700 mb-2">
              Binary Tree Maximum Path Sum
            </h2>
            <div className="flex items-center space-x-4 text-sm text-onyx-600 mb-4">
              <span className="bg-claret-100 text-claret-700 px-2 py-1 rounded montserrat-medium">
                Hard
              </span>
              <span>Expected Time: 30 minutes</span>
              <span>Points: 100</span>
            </div>

            <div className="prose text-onyx-700 montserrat-regular">
              <p className="mb-4">
                A path in a binary tree is a sequence of nodes where each pair
                of adjacent nodes in the sequence has an edge connecting them. A
                node can only appear in the sequence at most once. Note that the
                path does not need to pass through the root.
              </p>
              <p className="mb-4">
                The path sum of a path is the sum of the node's values in the
                path. Given the root of a binary tree, return the maximum path
                sum of any non-empty path.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="montserrat-semibold text-onyx-700 mb-3">
                Example
              </h3>
              <div className="bg-alabaster-50 p-4 rounded-lg text-sm">
                <div className="mb-2">
                  <strong>Input:</strong> root = [1,2,3]
                </div>
                <div className="mb-2">
                  <strong>Output:</strong> 6
                </div>
                <div>
                  <strong>Explanation:</strong> The optimal path is 2 → 1 → 3
                  with a path sum of 2 + 1 + 3 = 6.
                </div>
              </div>
            </div>
            <div>
              <h3 className="montserrat-semibold text-onyx-700 mb-3">
                Constraints
              </h3>
              <div className="bg-alabaster-50 p-4 rounded-lg text-sm">
                <ul className="space-y-1">
                  <li>
                    • The number of nodes in the tree is in the range [1, 3 ×
                    10⁴]
                  </li>
                  <li>• -1000 ≤ Node.val ≤ 1000</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="montserrat-semibold text-onyx-700 mb-3">
              Your Solution
            </h3>
            <textarea
              placeholder="Write your solution here..."
              className="w-full h-40 p-4 border border-alabaster-200 rounded-lg resize-none focus:ring-2 focus:ring-claret-300 focus:border-claret-400 montserrat-regular"
            />
            <div className="flex justify-between mt-4">
              <button className="text-onyx-600 hover:text-onyx-700 montserrat-medium">
                View Previous Attempts
              </button>
              <div className="space-x-3">
                <button className="bg-alabaster-200 hover:bg-alabaster-300 text-onyx-700 px-4 py-2 rounded-lg montserrat-semibold">
                  Test
                </button>
                <button className="bg-claret-500 hover:bg-claret-600 text-white px-4 py-2 rounded-lg montserrat-semibold">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyChallengeScreen;
