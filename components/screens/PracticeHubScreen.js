'use client'
import React, { useState } from "react";
import {
  Search,
  Filter,
  Clock,
  Award,
  TrendingUp,
  Code,
  Database,
  Brain,
  Zap,
  CheckCircle,
  Star,
  Users,
  Timer,
  Target,
} from "lucide-react";

const PracticeHubScreen = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("problems");

  const difficulties = ["All", "Easy", "Medium", "Hard"];
  const topics = [
    "All",
    "Arrays",
    "Strings",
    "Trees",
    "Graphs",
    "Dynamic Programming",
    "Sorting",
    "Searching",
  ];

  const practiceStats = [
    {
      icon: <Target className="w-5 h-5" />,
      label: "Problems Solved",
      value: "234",
      change: "+12 this week",
      color: "text-tea-green-600",
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: "Success Rate",
      value: "78%",
      change: "+3% from last month",
      color: "text-claret-500",
    },
    {
      icon: <Timer className="w-5 h-5" />,
      label: "Avg. Time",
      value: "23 min",
      change: "-2 min improvement",
      color: "text-onyx-600",
    },
    {
      icon: <Award className="w-5 h-5" />,
      label: "Current Streak",
      value: "12 days",
      change: "Keep it up!",
      color: "text-tea-green-600",
    },
  ];

  const problems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      topic: "Arrays",
      companies: ["Google", "Amazon", "Microsoft"],
      acceptance: "49.2%",
      solved: true,
      attempts: 3,
      bestTime: "5:23",
      description:
        "Given an array of integers, return indices of two numbers that add up to target.",
    },
    {
      id: 2,
      title: "Binary Tree Maximum Path Sum",
      difficulty: "Hard",
      topic: "Trees",
      companies: ["Facebook", "Apple", "Netflix"],
      acceptance: "36.8%",
      solved: false,
      attempts: 0,
      bestTime: null,
      description: "Given a non-empty binary tree, find the maximum path sum.",
    },
    {
      id: 3,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      topic: "Strings",
      companies: ["Amazon", "Bloomberg", "Adobe"],
      acceptance: "33.1%",
      solved: true,
      attempts: 2,
      bestTime: "12:45",
      description:
        "Find the length of the longest substring without repeating characters.",
    },
    {
      id: 4,
      title: "Merge k Sorted Lists",
      difficulty: "Hard",
      topic: "Sorting",
      companies: ["Google", "Facebook", "Uber"],
      acceptance: "45.7%",
      solved: false,
      attempts: 1,
      bestTime: null,
      description:
        "Merge k sorted linked lists and return it as one sorted list.",
    },
    {
      id: 5,
      title: "Valid Parentheses",
      difficulty: "Easy",
      topic: "Strings",
      companies: ["Microsoft", "Amazon", "Google"],
      acceptance: "40.3%",
      solved: true,
      attempts: 1,
      bestTime: "3:12",
      description:
        "Given a string containing just the characters (, ), {, }, [ and ], determine if the input string is valid.",
    },
    {
      id: 6,
      title: "House Robber",
      difficulty: "Medium",
      topic: "Dynamic Programming",
      companies: ["LinkedIn", "Adobe", "Apple"],
      acceptance: "44.2%",
      solved: false,
      attempts: 0,
      bestTime: null,
      description:
        "You are planning to rob houses along a street. Each house has a certain amount of money stashed.",
    },
  ];

  const topicProgress = [
    { name: "Arrays", solved: 45, total: 60, percentage: 75 },
    { name: "Strings", solved: 28, total: 40, percentage: 70 },
    { name: "Trees", solved: 15, total: 30, percentage: 50 },
    { name: "Graphs", solved: 8, total: 25, percentage: 32 },
    { name: "Dynamic Programming", solved: 12, total: 35, percentage: 34 },
    { name: "Sorting", solved: 18, total: 20, percentage: 90 },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-tea-green-600 bg-tea-green-100";
      case "Medium":
        return "text-yellow-600 bg-yellow-100";
      case "Hard":
        return "text-claret-600 bg-claret-100";
      default:
        return "text-onyx-600 bg-onyx-100";
    }
  };

  const filteredProblems = problems.filter((problem) => {
    const matchesDifficulty =
      selectedDifficulty === "All" || problem.difficulty === selectedDifficulty;
    const matchesTopic =
      selectedTopic === "All" || problem.topic === selectedTopic;
    const matchesSearch =
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesTopic && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-background p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl montserrat-bold text-onyx-700 mb-2">
          Practice Hub
        </h1>
        <p className="text-onyx-500 montserrat-regular">
          Master coding interviews with curated problems from top companies
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {practiceStats.map((stat, index) => (
          <div key={index} className="card animate-fade-in">
            <div className="card-content">
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`p-2 rounded-lg bg-alabaster-100 ${stat.color}`}
                >
                  {stat.icon}
                </div>
                <span className="text-2xl montserrat-bold text-onyx-700">
                  {stat.value}
                </span>
              </div>
              <h3 className="text-sm montserrat-medium text-onyx-600 mb-1">
                {stat.label}
              </h3>
              <p className="text-xs text-onyx-400">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-soft">
          {[
            {
              id: "problems",
              label: "Problems",
              icon: <Code className="w-4 h-4" />,
            },
            {
              id: "topics",
              label: "Topics",
              icon: <Brain className="w-4 h-4" />,
            },
            {
              id: "contests",
              label: "Contests",
              icon: <Zap className="w-4 h-4" />,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                selectedTab === tab.id
                  ? "bg-claret-500 text-white shadow-medium"
                  : "text-onyx-600 hover:bg-alabaster-100"
              }`}
            >
              {tab.icon}
              <span className="montserrat-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedTab === "problems" && (
        <>
          {/* Filters */}
          <div className="card mb-6">
            <div className="card-content">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-onyx-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search problems..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-alabaster-300 rounded-lg focus:ring-2 focus:ring-claret-300 focus:border-claret-400 bg-alabaster-50"
                  />
                </div>

                {/* Difficulty Filter */}
                <div className="flex items-center space-x-2">
                  <Filter className="text-onyx-400 w-4 h-4" />
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="px-3 py-2 border border-alabaster-300 rounded-lg focus:ring-2 focus:ring-claret-300 focus:border-claret-400 bg-white"
                  >
                    {difficulties.map((diff) => (
                      <option key={diff} value={diff}>
                        {diff}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Topic Filter */}
                <div>
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="px-3 py-2 border border-alabaster-300 rounded-lg focus:ring-2 focus:ring-claret-300 focus:border-claret-400 bg-white"
                  >
                    {topics.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Problems List */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl montserrat-semibold text-onyx-700">
                Problems ({filteredProblems.length})
              </h2>
            </div>
            <div className="divide-y divide-alabaster-200">
              {filteredProblems.map((problem) => (
                <div
                  key={problem.id}
                  className="p-6 hover:bg-alabaster-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {problem.solved ? (
                          <CheckCircle className="w-5 h-5 text-tea-green-600" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-onyx-300"></div>
                        )}
                        <h3 className="text-lg montserrat-semibold text-onyx-700 hover:text-claret-600 transition-colors">
                          {problem.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs montserrat-medium ${getDifficultyColor(
                            problem.difficulty
                          )}`}
                        >
                          {problem.difficulty}
                        </span>
                      </div>

                      <p className="text-onyx-600 mb-3 text-sm">
                        {problem.description}
                      </p>

                      <div className="flex items-center space-x-4 text-sm text-onyx-500">
                        <span className="flex items-center space-x-1">
                          <Database className="w-4 h-4" />
                          <span>{problem.topic}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{problem.acceptance} acceptance</span>
                        </span>
                        {problem.bestTime && (
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>Best: {problem.bestTime}</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 mt-2">
                        {problem.companies.slice(0, 3).map((company, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-timberwolf-200 text-onyx-600 rounded text-xs montserrat-medium"
                          >
                            {company}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <button className="btn-primary">
                        {problem.solved ? "Solve Again" : "Solve"}
                      </button>
                      {problem.attempts > 0 && (
                        <span className="text-xs text-onyx-500">
                          {problem.attempts} attempt
                          {problem.attempts !== 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {selectedTab === "topics" && (
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl montserrat-semibold text-onyx-700">
              Topic Progress
            </h2>
          </div>
          <div className="card-content">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topicProgress.map((topic, index) => (
                <div
                  key={index}
                  className="p-4 border border-alabaster-200 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="montserrat-semibold text-onyx-700">
                      {topic.name}
                    </h3>
                    <span className="text-sm text-onyx-500">
                      {topic.solved}/{topic.total}
                    </span>
                  </div>
                  <div className="w-full bg-alabaster-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-tea-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${topic.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-onyx-600">
                    {topic.percentage}% complete
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTab === "contests" && (
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl montserrat-semibold text-onyx-700">
              Upcoming Contests
            </h2>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {[
                {
                  name: "Weekly Contest 394",
                  date: "June 22, 2025",
                  time: "10:30 AM",
                  participants: "12,543",
                },
                {
                  name: "Biweekly Contest 131",
                  date: "June 25, 2025",
                  time: "2:30 PM",
                  participants: "8,921",
                },
                {
                  name: "Company Challenge: Google",
                  date: "June 28, 2025",
                  time: "11:00 AM",
                  participants: "5,672",
                },
              ].map((contest, index) => (
                <div
                  key={index}
                  className="p-4 border border-alabaster-200 rounded-lg flex items-center justify-between"
                >
                  <div>
                    <h3 className="montserrat-semibold text-onyx-700 mb-1">
                      {contest.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-onyx-500">
                      <span>{contest.date}</span>
                      <span>{contest.time}</span>
                      <span>{contest.participants} participants</span>
                    </div>
                  </div>
                  <button className="btn-outline">Register</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticeHubScreen;
