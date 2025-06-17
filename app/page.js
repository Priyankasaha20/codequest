"use client";
import React, { useState, useEffect } from "react";
import {
  Home,
  User,
  BookOpen,
  Calendar,
  Map,
  Brain,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  Trophy,
  Clock,
  Play,
  ChevronRight,
  Star,
  Target,
  Zap,
  Award,
  MessageCircle,
  Filter,
  Search,
  Bell,
  Menu,
  X,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Activity,
} from "lucide-react";

const PlacementPortal = () => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timer, setTimer] = useState(600); // 10 minutes for daily challenge
  const [timerActive, setTimerActive] = useState(false);

  // Timer effect for daily challenge
  useEffect(() => {
    let interval = null;
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const screens = {
    home: "Home",
    dashboard: "Dashboard",
    practice: "Practice Hub",
    daily: "Daily Challenge",
    learning: "Learning Path",
    quizzes: "Subject Quizzes",
    companies: "Company Prep",
    ai_coach: "AI Interview Coach",
    multiplayer: "Multiplayer Arena",
    profile: "Profile & Settings",
    analytics: "Analytics & Reports",
    about: "About Us",
    faq: "FAQ",
    contact: "Contact",
    terms: "Terms of Service",
    privacy: "Privacy Policy",
  };

  const navigation = [
    { id: "dashboard", name: "Dashboard", icon: Home },
    { id: "practice", name: "Practice Hub", icon: BookOpen },
    { id: "daily", name: "Daily Challenge", icon: Calendar },
    { id: "learning", name: "Learning Path", icon: Map },
    { id: "quizzes", name: "Subject Quizzes", icon: Brain },
    { id: "companies", name: "Company Prep", icon: Target },
    { id: "ai_coach", name: "AI Coach", icon: MessageCircle },
    { id: "multiplayer", name: "Multiplayer", icon: Users },
    { id: "analytics", name: "Analytics", icon: BarChart3 },
    { id: "profile", name: "Profile", icon: User },
  ];

  const Header = () => (
    <header className="bg-white border-b border-alabaster-200 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-md text-onyx-600 hover:bg-alabaster-100"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-xl font-bold text-onyx-500 ml-2">PrepPortal</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Bell className="w-5 h-5 text-onyx-600 cursor-pointer hover:text-claret-500" />
          <div className="w-8 h-8 bg-tea-green-300 rounded-full flex items-center justify-center">
            <User size={16} className="text-onyx-600" />
          </div>
        </div>
      </div>
    </header>
  );

  const Sidebar = () => (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-alabaster-200 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:inset-0`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-alabaster-200">
          <h2 className="text-lg font-semibold text-onyx-500">Navigation</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentScreen(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentScreen === item.id
                  ? "bg-tea-green-200 text-onyx-700"
                  : "text-onyx-600 hover:bg-alabaster-100"
              }`}
            >
              <item.icon size={18} className="mr-3" />
              {item.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );

  const HomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-alabaster-100 to-timberwolf-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-onyx-500 mb-6">
            Master Your{" "}
            <span className="text-claret-500">Placement Journey</span>
          </h1>
          <p className="text-xl text-onyx-600 mb-8 max-w-2xl mx-auto">
            Comprehensive preparation platform with AI-powered coaching, daily
            challenges, and company-specific prep
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setIsLoggedIn(true);
                setCurrentScreen("dashboard");
              }}
              className="bg-claret-500 hover:bg-claret-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Get Started
            </button>
            <button className="border border-onyx-300 text-onyx-600 hover:bg-onyx-50 px-8 py-3 rounded-lg font-medium transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-alabaster-200">
            <Brain className="w-12 h-12 text-claret-500 mb-4" />
            <h3 className="text-xl font-semibold text-onyx-500 mb-2">
              AI Interview Coach
            </h3>
            <p className="text-onyx-600">
              Practice with AI-powered mock interviews and get instant feedback
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-alabaster-200">
            <Target className="w-12 h-12 text-claret-500 mb-4" />
            <h3 className="text-xl font-semibold text-onyx-500 mb-2">
              Company-Specific Prep
            </h3>
            <p className="text-onyx-600">
              Targeted preparation for your dream companies with curated
              questions
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-alabaster-200">
            <Users className="w-12 h-12 text-claret-500 mb-4" />
            <h3 className="text-xl font-semibold text-onyx-500 mb-2">
              Multiplayer Arena
            </h3>
            <p className="text-onyx-600">
              Compete with peers in real-time coding challenges and quizzes
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const DashboardScreen = () => (
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

  const DailyChallengeScreen = () => (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg border border-alabaster-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-onyx-500">Daily Challenge</h1>
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
              className={`px-4 py-2 rounded-lg ${
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
          <h2 className="text-xl font-semibold text-onyx-700 mb-2">
            Binary Tree Maximum Path Sum
          </h2>
          <div className="flex items-center space-x-4 text-sm text-onyx-600 mb-4">
            <span className="bg-claret-100 text-claret-700 px-2 py-1 rounded">
              Hard
            </span>
            <span>Expected Time: 30 minutes</span>
            <span>Points: 100</span>
          </div>

          <div className="prose text-onyx-700">
            <p className="mb-4">
              A path in a binary tree is a sequence of nodes where each pair of
              adjacent nodes in the sequence has an edge connecting them. A node
              can only appear in the sequence at most once. Note that the path
              does not need to pass through the root.
            </p>
            <p className="mb-4">
              The path sum of a path is the sum of the node's values in the
              path. Given the root of a binary tree, return the maximum path sum
              of any non-empty path.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-onyx-700 mb-3">Example</h3>
            <div className="bg-alabaster-50 p-4 rounded-lg text-sm">
              <div className="mb-2">
                <strong>Input:</strong> root = [1,2,3]
              </div>
              <div className="mb-2">
                <strong>Output:</strong> 6
              </div>
              <div>
                <strong>Explanation:</strong> The optimal path is 2 → 1 → 3 with
                a path sum of 2 + 1 + 3 = 6.
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-onyx-700 mb-3">Constraints</h3>
            <div className="bg-alabaster-50 p-4 rounded-lg text-sm">
              <ul className="space-y-1">
                <li>
                  • The number of nodes in the tree is in the range [1, 3 × 10⁴]
                </li>
                <li>• -1000 ≤ Node.val ≤ 1000</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-onyx-700 mb-3">Your Solution</h3>
          <textarea
            placeholder="Write your solution here..."
            className="w-full h-40 p-4 border border-alabaster-200 rounded-lg resize-none focus:ring-2 focus:ring-claret-300 focus:border-claret-400"
          />
          <div className="flex justify-between mt-4">
            <button className="text-onyx-600 hover:text-onyx-700">
              View Previous Attempts
            </button>
            <div className="space-x-3">
              <button className="bg-alabaster-200 hover:bg-alabaster-300 text-onyx-700 px-4 py-2 rounded-lg">
                Test
              </button>
              <button className="bg-claret-500 hover:bg-claret-600 text-white px-4 py-2 rounded-lg">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PracticeHubScreen = () => (
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
              {[
                "Arrays",
                "Strings",
                "Trees",
                "Graphs",
                "Dynamic Programming",
                "System Design",
              ].map((cat) => (
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
              {["Easy", "Medium", "Hard"].map((diff) => (
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
              {[
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
              ].map((problem, index) => (
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

  const renderCurrentScreen = () => {
    if (!isLoggedIn && currentScreen !== "home") {
      return <HomeScreen />;
    }

    switch (currentScreen) {
      case "home":
        return <HomeScreen />;
      case "dashboard":
        return <DashboardScreen />;
      case "daily":
        return <DailyChallengeScreen />;
      case "practice":
        return <PracticeHubScreen />;
      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-onyx-500 mb-4">
              {screens[currentScreen]}
            </h1>
            <div className="bg-white rounded-lg border border-alabaster-200 p-8 text-center">
              <p className="text-onyx-600">This screen is under development.</p>
              <p className="text-sm text-onyx-500 mt-2">
                Features for {screens[currentScreen]} will be available soon.
              </p>
            </div>
          </div>
        );
    }
  };

  if (!isLoggedIn && currentScreen === "home") {
    return <HomeScreen />;
  }

  return (
    <div className="flex h-screen bg-alabaster-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-25 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">{renderCurrentScreen()}</main>
      </div>
    </div>
  );
};

export default PlacementPortal;
