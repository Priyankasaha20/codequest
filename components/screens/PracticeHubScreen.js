"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter, CheckCircle } from "lucide-react";
import { useAppContext } from "../../contexts/AppContext";

const PracticeHubScreen = () => {
  const router = useRouter();
  const { isLoggedIn } = useAppContext();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null; // or a loading spinner
  }
  const problems = [
    {
      title: "Two Sum",
      difficulty: "Easy",
      acceptance: "49.8%",
      solved: true,
    },
    {
      title: "Add Two Numbers",
      difficulty: "Medium",
      acceptance: "38.4%",
      solved: false,
    },
    {
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      acceptance: "33.9%",
      solved: true,
    },
    {
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      acceptance: "35.8%",
      solved: false,
    },
    {
      title: "Longest Palindromic Substring",
      difficulty: "Medium",
      acceptance: "32.5%",
      solved: false,
    },
  ];

  const categories = [
    "Arrays",
    "Strings",
    "Trees",
    "Graphs",
    "Dynamic Programming",
    "System Design",
  ];
  const difficulties = ["Easy", "Medium", "Hard"];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-onyx-500 mb-4">Practice Hub</h1>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Search size={20} className="text-onyx-600" />
            <input
              type="text"
              placeholder="Search problems..."
              className="border border-alabaster-200 rounded-lg px-3 py-2 w-64"
            />
          </div>
          <button className="flex items-center px-3 py-2 border border-alabaster-200 rounded-lg hover:bg-alabaster-50">
            <Filter size={16} className="mr-2" />
            Filters
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-alabaster-200 p-4">
            <h3 className="font-semibold text-onyx-700 mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-onyx-600">{cat}</span>
                </label>
              ))}
            </div>
            <h3 className="font-semibold text-onyx-700 mt-6 mb-3">
              Difficulty
            </h3>
            <div className="space-y-2">
              {difficulties.map((diff) => (
                <label key={diff} className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-onyx-600">{diff}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg border border-alabaster-200">
            <div className="p-4 border-b border-alabaster-200">
              <div className="flex justify-between items-center">
                <span className="text-onyx-700 font-medium">
                  1,247 problems
                </span>
                <select className="border border-alabaster-200 rounded px-3 py-1 text-sm">
                  <option>Sort by: Difficulty</option>
                  <option>Sort by: Frequency</option>
                  <option>Sort by: Acceptance</option>
                </select>
              </div>
            </div>
            <div className="divide-y divide-alabaster-200">
              {problems.map((problem, index) => (
                <div
                  key={index}
                  className="p-4 hover:bg-alabaster-50 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CheckCircle
                        size={16}
                        className={
                          problem.solved
                            ? "text-tea-green-500"
                            : "text-alabaster-300"
                        }
                      />
                      <span className="font-medium text-onyx-700">
                        {problem.title}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded ${
                          problem.difficulty === "Easy"
                            ? "bg-tea-green-100 text-tea-green-700"
                            : problem.difficulty === "Medium"
                            ? "bg-claret-100 text-claret-700"
                            : "bg-onyx-100 text-onyx-700"
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                      <span className="text-onyx-600">
                        {problem.acceptance}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeHubScreen;
