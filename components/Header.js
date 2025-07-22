"use client";
import React, { useState } from "react";
import {
  Bell,
  Menu,
  X,
  User,
  Search,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      text: "New quiz available: Computer Networks",
      time: "2 mins ago",
      unread: true,
    },
    {
      id: 2,
      text: "You completed Google Interview Prep!",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      text: "Daily challenge streak: 5 days",
      time: "3 hours ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Get current page title
  const getPageTitle = () => {
    const titles = {
      "/dashboard": "Dashboard",
      "/practice-hub": "Practice Hub",
      "/daily-challenge": "Daily Challenge",
      "/quizzes": "Subject Quizzes",
      "/company-prep": "Company Prep",
      "/ai-coach": "AI Coach",
      "/multiplayer": "Multiplayer Arena",
      "/analytics": "Analytics",
      "/profile": "Profile",
    };
    return titles[pathname] || "CodeQuest";
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-alabaster-200/50 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg text-onyx-600 hover:bg-alabaster-100 hover:text-claret-600 transition-colors"
              aria-label="Toggle sidebar"
            >
              <motion.div
                animate={{ rotate: sidebarOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </button>

            
          </div>

          {/* Center Section - Search (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-onyx-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search quizzes, companies, questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-alabaster-50 border border-alabaster-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-claret-500/50 focus:border-claret-500 transition-colors montserrat-regular text-sm"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Search Button (Mobile) */}
            <button className="lg:hidden p-2 rounded-lg text-onyx-600 hover:bg-alabaster-100 hover:text-claret-600 transition-colors">
              <Search size={18} />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-onyx-600 hover:bg-alabaster-100 hover:text-claret-600 transition-colors"
                aria-label="Notifications"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-claret-500 text-white text-xs rounded-full flex items-center justify-center montserrat-bold"
                  >
                    {unreadCount}
                  </motion.span>
                )}
              </button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-alabaster-200 py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b border-alabaster-100">
                      <h3 className="text-sm montserrat-semibold text-onyx-700">
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-alabaster-50 cursor-pointer border-l-2 ${
                            notification.unread
                              ? "border-claret-500 bg-claret-25"
                              : "border-transparent"
                          }`}
                        >
                          <p className="text-sm text-onyx-700 montserrat-medium">
                            {notification.text}
                          </p>
                          <p className="text-xs text-onyx-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-alabaster-100">
                      <button className="text-sm text-claret-600 hover:text-claret-700 montserrat-medium">
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-alabaster-100 transition-colors"
                aria-label="User menu"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-tea-green-400 to-tea-green-500 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm montserrat-semibold text-onyx-700">
                    John Doe
                  </p>
                  <p className="text-xs text-onyx-500">Student</p>
                </div>
                <ChevronDown
                  size={14}
                  className={`text-onyx-500 transition-transform ${
                    showProfileMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-alabaster-200 py-2 z-50"
                  >
                    <button
                      onClick={() => router.push("/profile")}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-onyx-700 hover:bg-alabaster-50 transition-colors"
                    >
                      <User size={16} />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={() => router.push("/settings")}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-onyx-700 hover:bg-alabaster-50 transition-colors"
                    >
                      <Settings size={16} />
                      <span>Settings</span>
                    </button>
                    <hr className="my-2 border-alabaster-200" />
                    <button
                      onClick={() => router.push("/login")}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} />
                      <span>Sign out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showNotifications || showProfileMenu) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setShowNotifications(false);
            setShowProfileMenu(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;
