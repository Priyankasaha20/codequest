"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const Sidebar = ({ navigation, sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();
  const router = useRouter();
  // Map navigation IDs to routes
  const getRouteFromId = (id) => {
    const routeMap = {
      dashboard: "/dashboard",
      practice: "/practice-hub",
      daily: "/daily-challenge",
      learning: "/learning",
      quizzes: "/quizzes",
      companies: "/company-prep",
      ai_coach: "/ai-coach", // Using the hyphenated path
      multiplayer: "/multiplayer",
      analytics: "/analytics",
      profile: "/profile",
    };
    return routeMap[id] || `/${id}`;
  };

  const isCurrentRoute = (id) => {
    const route = getRouteFromId(id);
    return pathname === route;
  };
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-alabaster-200 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:inset-0`}
    >
      <div className="flex flex-col h-full">
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.id}
              href={getRouteFromId(item.id)}
              onClick={() => setSidebarOpen(false)}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isCurrentRoute(item.id)
                  ? "bg-tea-green-200 text-onyx-700"
                  : "text-onyx-600 hover:bg-alabaster-100"
              }`}
            >
              <item.icon size={18} className="mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
