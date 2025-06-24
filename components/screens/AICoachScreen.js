'use client'
import React, { useState } from "react";
import {
  Bot,
  MessageCircle,
  Play,
  Clock,
  Trophy,
  Target,
  Star,
  Mic,
  Video,
  Brain,
  Code,
  Users,
  Sparkles,
  TrendingUp,
  CheckCircle,
  Calendar,
  FileText,
  Award,
} from "lucide-react";

const AICoachScreen = () => {
  const [selectedInterviewType, setSelectedInterviewType] = useState("technical");

  const aiStats = [
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "Mock Interviews",
      value: "23",
      change: "+3 this week",
      color: "text-claret-500",
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      label: "Avg Score",
      value: "8.4/10",
      change: "+0.8 improvement",
      color: "text-tea-green-600",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Practice Time",
      value: "24h",
      change: "This month",
      color: "text-onyx-600",
    },
    {
      icon: <Target className="w-5 h-5" />,
      label: "Skills Improved",
      value: "12",
      change: "Key areas",
      color: "text-tea-green-600",
    },
  ];

  const interviewTypes = [
    {
      id: "technical",
      title: "Technical Interview",
      description: "Practice coding problems and technical concepts",
      icon: <Code className="w-6 h-6" />,
      duration: "45-60 mins",
      difficulty: "Medium",
      color: "bg-claret-100 text-claret-600",
    },
    {
      id: "behavioral",
      title: "Behavioral Interview",
      description: "Practice STAR method and soft skills questions",
      icon: <Users className="w-6 h-6" />,
      duration: "30-45 mins",
      difficulty: "Easy",
      color: "bg-tea-green-100 text-tea-green-600",
    },
    {
      id: "system-design",
      title: "System Design",
      description: "Design scalable systems and architecture",
      icon: <Brain className="w-6 h-6" />,
      duration: "60-90 mins",
      difficulty: "Hard",
      color: "bg-blue-100 text-blue-600",
    },
  ];

  const recentSessions = [
    {
      type: "Technical",
      company: "Google",
      score: "8.5/10",
      date: "2 hours ago",
      feedback: "Great problem-solving approach",
    },
    {
      type: "Behavioral",
      company: "Microsoft",
      score: "7.8/10",
      date: "Yesterday",
      feedback: "Good STAR format usage",
    },
    {
      type: "System Design",
      company: "Amazon",
      score: "9.2/10",
      date: "3 days ago",
      feedback: "Excellent scalability considerations",
    },
  ];

  const aiFeatures = [
    {
      icon: <Sparkles className="w-8 h-8 text-claret-500" />,
      title: "Intelligent Feedback",
      description:
        "Get detailed analysis of your performance with personalized improvement suggestions",
    },
    {
      icon: <Mic className="w-8 h-8 text-tea-green-500" />,
      title: "Voice Practice",
      description:
        "Practice speaking clearly and confidently with our voice analysis technology",
    },
    {
      icon: <Video className="w-8 h-8 text-blue-500" />,
      title: "Video Simulation",
      description:
        "Experience realistic interview scenarios with our advanced AI interviewer",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-background p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl montserrat-bold text-onyx-700 mb-2 flex items-center gap-2">
          <Bot className="w-8 h-8 text-claret-500" /> AI Interview Coach
        </h1>
        <p className="text-onyx-600 montserrat-regular">
          Practice interviews with AI-powered feedback and boost your
          confidence
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {aiStats.map((stat, index) => (
          <div key={index} className="card">
            <div className="card-content flex items-center justify-between">
              <div>
                <p className="text-sm montserrat-medium text-onyx-600">
                  {stat.label}
                </p>
                <p className="text-2xl montserrat-bold text-claret-500">
                  {stat.value}
                </p>
                <p className="text-xs text-onyx-500">{stat.change}</p>
              </div>
              <div className={stat.color}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Interview Selection */}
        <div className="lg:col-span-2">
          <div className="card mb-8">
            <div className="card-content">
              <h2 className="text-lg montserrat-semibold text-onyx-500 mb-6">
                Start Mock Interview
              </h2>
              <div className="space-y-4">
                {interviewTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => setSelectedInterviewType(type.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedInterviewType === type.id
                        ? "border-claret-400 bg-claret-50"
                        : "border-alabaster-200 hover:border-alabaster-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${type.color}`}>
                          {type.icon}
                        </div>
                        <div>
                          <h3 className="text-lg montserrat-semibold text-onyx-700">
                            {type.title}
                          </h3>
                          <p className="text-onyx-600 text-sm mb-2">
                            {type.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-onyx-500">
                            <span className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{type.duration}</span>
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full ${
                                type.difficulty === "Easy"
                                  ? "bg-tea-green-100 text-tea-green-600"
                                  : type.difficulty === "Medium"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {type.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                      {selectedInterviewType === type.id && (
                        <CheckCircle className="w-5 h-5 text-claret-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <button className="bg-claret-500 hover:bg-claret-600 text-white px-8 py-3 rounded-lg montserrat-semibold transition-colors flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Start Interview</span>
                </button>
              </div>
            </div>
          </div>

          {/* AI Features */}
          <div className="card">
            <div className="card-content">
              <h2 className="text-lg montserrat-semibold text-onyx-500 mb-6">
                AI-Powered Features
              </h2>
              <div className="space-y-6">
                {aiFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{feature.icon}</div>
                    <div>
                      <h3 className="text-lg montserrat-semibold text-onyx-700 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-onyx-600 montserrat-regular">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Sessions */}
          <div className="card">
            <div className="card-content">
              <h3 className="text-lg montserrat-semibold text-onyx-500 mb-4">
                Recent Sessions
              </h3>
              <div className="space-y-4">
                {recentSessions.map((session, index) => (
                  <div key={index} className="p-3 bg-alabaster-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="montserrat-semibold text-onyx-700 text-sm">
                          {session.type} - {session.company}
                        </h4>
                        <p className="text-xs text-onyx-500">
                          {session.date}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-sm montserrat-medium text-onyx-700">
                          {session.score}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-onyx-600 italic">
                      "{session.feedback}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-content">
              <h3 className="text-lg montserrat-semibold text-onyx-500 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                {[
                  {
                    icon: <FileText className="w-5 h-5" />,
                    label: "View Reports",
                  },
                  {
                    icon: <Trophy className="w-5 h-5" />,
                    label: "Practice History",
                  },
                  {
                    icon: <Target className="w-5 h-5" />,
                    label: "Set Goals",
                  },
                  {
                    icon: <Brain className="w-5 h-5" />,
                    label: "Study Resources",
                  },
                ].map((item, index) => (
                  <button
                    key={index}
                    className="flex items-center space-x-3 w-full p-3 text-left rounded-lg hover:bg-alabaster-100 transition-colors"
                  >
                    <span className="text-onyx-500">{item.icon}</span>
                    <span className="montserrat-medium text-onyx-700">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICoachScreen;
