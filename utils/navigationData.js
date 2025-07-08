import {
  Home,
  User,
  BookOpen,
  Calendar,
  Map,
  Brain,
  Users,
  BarChart3,
  Target,
  MessageCircle,
} from "lucide-react";

export const screens = {
  home: "Home",
  dashboard: "Dashboard",
  practice: "Practice Hub",
  daily: "Daily Challenge",
  learning: "Learning Path",
  quizzes: "Subject Quizzes",
  companies: "Company Prep",
  ai_coach: "AI Interview Coach", // Using the same ID for backward compatibility
  multiplayer: "Multiplayer Arena",
  profile: "Profile & Settings",
  analytics: "Analytics & Reports",
  about: "About Us",
  faq: "FAQ",
  contact: "Contact",
  terms: "Terms of Service",
  privacy: "Privacy Policy",
};

export const navigation = [
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
