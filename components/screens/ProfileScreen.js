"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Save,
  X,
  Camera,
  Award,
  Trophy,
  Target,
  TrendingUp,
  Code,
  BookOpen,
  Star,
  Github,
  Linkedin,
  Globe,
  Settings,
  Shield,
  Bell,
  Eye,
  EyeOff,
  Upload,
  Download,
  Trash2,
  Plus,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

const ProfileScreen = ({ profileData }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Map server props to local state
  const [profileState, setProfileState] = useState({
    name: profileData.name,
    email: profileData.email,
    phoneNumber: profileData.phoneNumber,
    location: profileData.location,
    institute: profileData.institute,
    academicYear: profileData.academicYear,
    bio: profileData.bio,
    profilePic: profileData.profilePic,
  });

  const achievements = [
    {
      icon: <Trophy className="w-8 h-8 text-yellow-500" />,
      title: "Problem Solver",
      description: "Solved 250+ coding problems",
      date: "June 2025",
      rarity: "Gold",
    },
    {
      icon: <Target className="w-8 h-8 text-claret-500" />,
      title: "Streak Master",
      description: "30-day coding streak",
      date: "May 2025",
      rarity: "Silver",
    },
    {
      icon: <Star className="w-8 h-8 text-tea-green-600" />,
      title: "Top Performer",
      description: "Top 5% in weekly contest",
      date: "April 2025",
      rarity: "Bronze",
    },
    {
      icon: <Code className="w-8 h-8 text-blue-500" />,
      title: "Algorithm Expert",
      description: "Mastered Dynamic Programming",
      date: "March 2025",
      rarity: "Gold",
    },
  ];

  const stats = [
    {
      label: "Problems Solved",
      value: "234",
      trend: "+12 this week",
      color: "text-tea-green-600",
    },
    {
      label: "Success Rate",
      value: "78%",
      trend: "+3% this month",
      color: "text-claret-500",
    },
    {
      label: "Contest Rating",
      value: "1847",
      trend: "+47 points",
      color: "text-blue-600",
    },
    {
      label: "Streak Days",
      value: "12",
      trend: "Current streak",
      color: "text-yellow-600",
    },
  ];

  const skillsData = [
    { name: "JavaScript", level: 90, category: "Languages" },
    { name: "Python", level: 85, category: "Languages" },
    { name: "Java", level: 80, category: "Languages" },
    { name: "React", level: 88, category: "Frameworks" },
    { name: "Node.js", level: 82, category: "Frameworks" },
    { name: "Express", level: 75, category: "Frameworks" },
    { name: "MongoDB", level: 70, category: "Databases" },
    { name: "PostgreSQL", level: 78, category: "Databases" },
    { name: "AWS", level: 65, category: "Cloud" },
    { name: "Docker", level: 72, category: "DevOps" },
  ];

  const recentActivity = [
    {
      type: "problem",
      title: 'Solved "Binary Tree Maximum Path Sum"',
      time: "2 hours ago",
      difficulty: "Hard",
    },
    {
      type: "contest",
      title: "Participated in Weekly Contest 394",
      time: "1 day ago",
      rank: "47th",
    },
    {
      type: "achievement",
      title: 'Earned "Streak Master" badge',
      time: "3 days ago",
      badge: "Silver",
    },
    {
      type: "learning",
      title: 'Completed "Advanced Algorithms" module',
      time: "5 days ago",
      progress: "100%",
    },
  ];

  const handleInputChange = (field, value) => {
    // Update local profile state
    setProfileState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add save logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "Gold":
        return "border-yellow-300 bg-yellow-50";
      case "Silver":
        return "border-gray-300 bg-gray-50";
      case "Bronze":
        return "border-orange-300 bg-orange-50";
      default:
        return "border-alabaster-300 bg-alabaster-50";
    }
  };

  const getSkillColor = (level) => {
    if (level >= 80) return "bg-tea-green-500";
    if (level >= 60) return "bg-yellow-500";
    return "bg-claret-500";
  };

  return (
    <div className="min-h-screen bg-gradient-background p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl montserrat-bold text-onyx-700 mb-2">Profile</h1>
        <p className="text-onyx-500 montserrat-regular">
          Manage your account settings and track your progress
        </p>
      </div>

      {/* Profile Header Card */}
      <div className="card mb-8">
        <div className="card-content">
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 bg-claret-500 rounded-full overflow-hidden flex items-center justify-center text-white text-4xl montserrat-bold">
                {profileState.profilePic ? (
                  <Image
                    src={profileState.profilePic}
                    alt={profileState.name}
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                ) : (
                  profileState.name?.charAt(0) || ""
                )}
              </div>
              <button className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow-medium flex items-center justify-center text-onyx-600 hover:bg-alabaster-100 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl montserrat-bold text-onyx-700 mb-1">
                    {profileState.name}
                  </h2>
                  <p className="text-onyx-500 mb-2">
                    {profileState.institute} • {profileState.academicYear}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-onyx-500">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{profileData.location}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Graduated {profileData.graduationYear}</span>
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`btn-${
                    isEditing ? "secondary" : "outline"
                  } flex items-center space-x-2`}
                >
                  <Edit3 className="w-4 h-4" />
                  <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
                </button>
              </div>

              <p className="text-onyx-600 mb-4">{profileData.bio}</p>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <a
                  href={`https://${profileData.github}`}
                  className="flex items-center space-x-1 text-onyx-500 hover:text-claret-500 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm">GitHub</span>
                </a>
                <a
                  href={`https://${profileData.linkedin}`}
                  className="flex items-center space-x-1 text-onyx-500 hover:text-claret-500 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="text-sm">LinkedIn</span>
                </a>
                <a
                  href={`https://${profileData.portfolio}`}
                  className="flex items-center space-x-1 text-onyx-500 hover:text-claret-500 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">Portfolio</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="card-content">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm montserrat-medium text-onyx-600">
                  {stat.label}
                </span>
                <TrendingUp className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="text-2xl montserrat-bold text-onyx-700 mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-onyx-500">{stat.trend}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-soft">
          {[
            {
              id: "overview",
              label: "Overview",
              icon: <User className="w-4 h-4" />,
            },
            {
              id: "achievements",
              label: "Achievements",
              icon: <Award className="w-4 h-4" />,
            },
            {
              id: "skills",
              label: "Skills",
              icon: <Code className="w-4 h-4" />,
            },
            {
              id: "activity",
              label: "Activity",
              icon: <BookOpen className="w-4 h-4" />,
            },
            {
              id: "settings",
              label: "Settings",
              icon: <Settings className="w-4 h-4" />,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                activeTab === tab.id
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

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg montserrat-semibold text-onyx-700">
                Personal Information
              </h3>
            </div>
            <div className="card-content space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <label className="block text-sm montserrat-medium text-onyx-600 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileState.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-alabaster-300 rounded-lg focus:ring-2 focus:ring-claret-300 focus:border-claret-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm montserrat-medium text-onyx-600 mb-1">
                      Bio
                    </label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-alabaster-300 rounded-lg focus:ring-2 focus:ring-claret-300 focus:border-claret-400"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSave}
                      className="btn-primary flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="btn-outline flex items-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-onyx-400" />
                    <span className="text-onyx-600">{profileData.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-onyx-400" />
                    <span className="text-onyx-600">
                      {profileData.phoneNumber}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-onyx-400" />
                    <span className="text-onyx-600">
                      +{profileData.location}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-onyx-400" />
                    <span className="text-onyx-600">
                      {profileData.institute}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg montserrat-semibold text-onyx-700">
                Quick Actions
              </h3>
            </div>
            <div className="card-content space-y-3">
              {[
                {
                  icon: <Download className="w-5 h-5" />,
                  label: "Download Resume",
                  action: "download",
                },
                {
                  icon: <Upload className="w-5 h-5" />,
                  label: "Upload Resume",
                  action: "upload",
                },
                {
                  icon: <ExternalLink className="w-5 h-5" />,
                  label: "Share Profile",
                  action: "share",
                },
                {
                  icon: <Shield className="w-5 h-5" />,
                  label: "Privacy Settings",
                  action: "privacy",
                },
              ].map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-3 rounded-lg border border-alabaster-200 hover:bg-alabaster-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-onyx-500">{item.icon}</div>
                    <span className="montserrat-medium text-onyx-700">
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-onyx-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "achievements" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`card border-2 ${getRarityColor(achievement.rarity)}`}
            >
              <div className="card-content">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="montserrat-semibold text-onyx-700">
                        {achievement.title}
                      </h3>
                      <span className="text-xs px-2 py-1 bg-white rounded-full montserrat-medium text-onyx-600">
                        {achievement.rarity}
                      </span>
                    </div>
                    <p className="text-onyx-600 text-sm mb-2">
                      {achievement.description}
                    </p>
                    <p className="text-xs text-onyx-500">
                      Earned {achievement.date}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "skills" && (
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg montserrat-semibold text-onyx-700">
              Technical Skills
            </h3>
          </div>
          <div className="card-content">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["Languages", "Frameworks", "Databases", "Cloud", "DevOps"].map(
                (category) => (
                  <div key={category}>
                    <h4 className="montserrat-semibold text-onyx-700 mb-3">
                      {category}
                    </h4>
                    <div className="space-y-3">
                      {skillsData
                        .filter((skill) => skill.category === category)
                        .map((skill, index) => (
                          <div key={index}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm montserrat-medium text-onyx-700">
                                {skill.name}
                              </span>
                              <span className="text-sm text-onyx-500">
                                {skill.level}%
                              </span>
                            </div>
                            <div className="w-full bg-alabaster-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all duration-500 ${getSkillColor(
                                  skill.level
                                )}`}
                                style={{ width: `${skill.level}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "activity" && (
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg montserrat-semibold text-onyx-700">
              Recent Activity
            </h3>
          </div>
          <div className="divide-y divide-alabaster-200">
            {recentActivity.map((activity, index) => (
              <div key={index} className="p-6">
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === "problem"
                        ? "bg-tea-green-100 text-tea-green-600"
                        : activity.type === "contest"
                        ? "bg-blue-100 text-blue-600"
                        : activity.type === "achievement"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    {activity.type === "problem" && (
                      <Code className="w-4 h-4" />
                    )}
                    {activity.type === "contest" && (
                      <Trophy className="w-4 h-4" />
                    )}
                    {activity.type === "achievement" && (
                      <Award className="w-4 h-4" />
                    )}
                    {activity.type === "learning" && (
                      <BookOpen className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="montserrat-medium text-onyx-700 mb-1">
                      {activity.title}
                    </p>
                    <div className="flex items-center space-x-3 text-sm text-onyx-500">
                      <span>{activity.time}</span>
                      {activity.difficulty && (
                        <span className="px-2 py-1 bg-alabaster-200 rounded-full">
                          {activity.difficulty}
                        </span>
                      )}
                      {activity.rank && (
                        <span className="px-2 py-1 bg-blue-100 rounded-full">
                          Rank: {activity.rank}
                        </span>
                      )}
                      {activity.badge && (
                        <span className="px-2 py-1 bg-yellow-100 rounded-full">
                          {activity.badge} Badge
                        </span>
                      )}
                      {activity.progress && (
                        <span className="px-2 py-1 bg-tea-green-100 rounded-full">
                          {activity.progress}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Account Settings */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg montserrat-semibold text-onyx-700">
                Account Settings
              </h3>
            </div>
            <div className="card-content space-y-4">
              <div>
                <label className="block text-sm montserrat-medium text-onyx-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-3 py-2 border border-alabaster-300 rounded-lg focus:ring-2 focus:ring-claret-300 focus:border-claret-400"
                />
              </div>
              <div>
                <label className="block text-sm montserrat-medium text-onyx-600 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-3 py-2 border border-alabaster-300 rounded-lg focus:ring-2 focus:ring-claret-300 focus:border-claret-400"
                />
              </div>
              <div>
                <label className="block text-sm montserrat-medium text-onyx-600 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={profileData.currentPassword}
                    onChange={(e) =>
                      handleInputChange("currentPassword", e.target.value)
                    }
                    className="w-full px-3 py-2 pr-10 border border-alabaster-300 rounded-lg focus:ring-2 focus:ring-claret-300 focus:border-claret-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-onyx-400"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm montserrat-medium text-onyx-600 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={profileData.newPassword}
                  onChange={(e) =>
                    handleInputChange("newPassword", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-alabaster-300 rounded-lg focus:ring-2 focus:ring-claret-300 focus:border-claret-400"
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg montserrat-semibold text-onyx-700">
                Notifications
              </h3>
            </div>
            <div className="card-content space-y-4">
              {[
                {
                  label: "Email Notifications",
                  description: "Receive email updates about your progress",
                },
                {
                  label: "Contest Reminders",
                  description: "Get notified about upcoming contests",
                },
                {
                  label: "Achievement Alerts",
                  description: "Celebrate your milestones",
                },
                {
                  label: "Daily Challenge",
                  description: "Daily coding challenge notifications",
                },
              ].map((setting, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="montserrat-medium text-onyx-700">
                      {setting.label}
                    </p>
                    <p className="text-sm text-onyx-500">
                      {setting.description}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-claret-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-claret-500"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
