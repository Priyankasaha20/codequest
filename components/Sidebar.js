"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  Trophy,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

const Sidebar = ({ navigation, sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Map navigation IDs to routes
  const getRouteFromId = (id) => {
    const routeMap = {
      dashboard: "/dashboard",
      practice: "/dashboard/practice-hub",
      daily: "/dashboard/daily-challenge",
      quizzes: "/dashboard/quizzes",
      companies: "/dashboard/company-prep",
      ai_coach: "/dashboard/ai-coach",
      multiplayer: "/dashboard/multiplayer",
      analytics: "/dashboard/analytics",
      profile: "/dashboard/profile",
    };
    return routeMap[id] || `/${id}`;
  };

  const isCurrentRoute = (id) => {
    const route = getRouteFromId(id);
    return pathname === route || pathname.startsWith(route + "/");
  };

  // Group navigation items
  const mainNavigation = navigation.slice(0, 6); // Main features
  const secondaryNavigation = navigation.slice(6); // Analytics, Profile, etc.

  // Mock user stats
  const userStats = {
    streak: 7,
    totalQuizzes: 23,
    level: "Intermediate",
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 280,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 bg-white border-r border-alabaster-200 shadow-lg transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 ${
          isCollapsed ? "w-20" : "w-70"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-alabaster-100">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-claret-500 to-claret-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CQ</span>
                </div>
                <div>
                  <h2 className="text-lg montserrat-bold text-onyx-700">
                    CodeQuest
                  </h2>
                  <p className="text-xs text-onyx-500">
                    Interview Prep Platform
                  </p>
                </div>
              </motion.div>
            )}

            {/* Collapse Button (Desktop only) */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex p-1.5 rounded-lg text-onyx-500 hover:bg-alabaster-100 hover:text-claret-600 transition-colors"
              aria-label="Collapse sidebar"
            >
              {isCollapsed ? (
                <ChevronRight size={16} />
              ) : (
                <ChevronLeft size={16} />
              )}
            </button>
          </div>

          {/* User Stats Card */}
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="m-4 p-4 bg-gradient-to-br from-claret-50 to-tea-green-50 rounded-xl border border-claret-100"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-claret-500" />
                  <span className="text-sm montserrat-semibold text-onyx-700">
                    Progress
                  </span>
                </div>
                <span className="text-xs px-2 py-1 bg-claret-100 text-claret-700 rounded-full montserrat-medium">
                  {userStats.level}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-lg montserrat-bold text-claret-600">
                    {userStats.streak}
                  </div>
                  <div className="text-xs text-onyx-500">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-lg montserrat-bold text-tea-green-600">
                    {userStats.totalQuizzes}
                  </div>
                  <div className="text-xs text-onyx-500">Completed</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Main Navigation */}
          <nav className="flex-1 px-4 space-y-2">
            {/* Main Section */}
            <div className="space-y-1">
              {!isCollapsed && (
                <h3 className="px-3 py-2 text-xs font-semibold text-onyx-500 uppercase tracking-wider">
                  Main
                </h3>
              )}
              {mainNavigation.map((item) => {
                const isActive = isCurrentRoute(item.id);
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={getRouteFromId(item.id)}
                      onClick={() => setSidebarOpen(false)}
                      className={`group relative flex items-center px-3 py-2.5 text-sm montserrat-medium rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-claret-500 to-claret-600 text-white shadow-lg shadow-claret-500/25"
                          : "text-onyx-600 hover:bg-alabaster-100 hover:text-claret-600"
                      }`}
                      title={isCollapsed ? item.name : undefined}
                    >
                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-claret-500 to-claret-600 rounded-xl"
                          initial={false}
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}

                      {/* Icon */}
                      <div className="relative z-10">
                        <item.icon
                          size={20}
                          className={`${isCollapsed ? "mx-auto" : "mr-3"} ${
                            isActive ? "text-white" : "text-current"
                          }`}
                        />
                      </div>

                      {/* Label */}
                      {!isCollapsed && (
                        <span className="relative z-10 flex-1">
                          {item.name}
                        </span>
                      )}

                      {/* Badge for active items */}
                      {isActive && !isCollapsed && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="relative z-10 w-2 h-2 bg-white rounded-full opacity-75"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Secondary Section */}
            {secondaryNavigation.length > 0 && (
              <div className="pt-6 space-y-1">
                {!isCollapsed && (
                  <h3 className="px-3 py-2 text-xs font-semibold text-onyx-500 uppercase tracking-wider">
                    Account
                  </h3>
                )}
                {secondaryNavigation.map((item) => {
                  const isActive = isCurrentRoute(item.id);
                  return (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href={getRouteFromId(item.id)}
                        onClick={() => setSidebarOpen(false)}
                        className={`group flex items-center px-3 py-2.5 text-sm montserrat-medium rounded-xl transition-all duration-200 ${
                          isActive
                            ? "bg-tea-green-100 text-tea-green-700 border-l-2 border-tea-green-500"
                            : "text-onyx-600 hover:bg-alabaster-100 hover:text-claret-600"
                        }`}
                        title={isCollapsed ? item.name : undefined}
                      >
                        <item.icon
                          size={18}
                          className={`${isCollapsed ? "mx-auto" : "mr-3"}`}
                        />
                        {!isCollapsed && (
                          <span className="flex-1">{item.name}</span>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-alabaster-100">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2"
              >
                {/* Quick Actions */}
                <div className="flex space-x-2">
                  <button
                    className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-alabaster-100 hover:bg-alabaster-200 rounded-lg transition-colors"
                    title="Help & Support"
                  >
                    <HelpCircle size={16} className="text-onyx-600" />
                    <span className="text-xs montserrat-medium text-onyx-600">
                      Help
                    </span>
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-alabaster-100 hover:bg-alabaster-200 rounded-lg transition-colors"
                    title="Settings"
                    onClick={() => router.push("/settings")}
                  >
                    <Settings size={16} className="text-onyx-600" />
                    <span className="text-xs montserrat-medium text-onyx-600">
                      Settings
                    </span>
                  </button>
                </div>

                {/* Version Info */}
                <div className="text-center">
                  <p className="text-xs text-onyx-400 montserrat-regular">
                    CodeQuest v2.0.1
                  </p>
                </div>
              </motion.div>
            )}

            {/* Collapsed state bottom actions */}
            {isCollapsed && (
              <div className="space-y-2">
                <button
                  className="w-full p-2 hover:bg-alabaster-100 rounded-lg transition-colors"
                  title="Help & Support"
                >
                  <HelpCircle size={18} className="text-onyx-600 mx-auto" />
                </button>
                <button
                  className="w-full p-2 hover:bg-alabaster-100 rounded-lg transition-colors"
                  title="Settings"
                  onClick={() => router.push("/settings")}
                >
                  <Settings size={18} className="text-onyx-600 mx-auto" />
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
