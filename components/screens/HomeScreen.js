"use client";
import React from "react";
import Link from "next/link";
import {
  Brain,
  Target,
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Code,
} from "lucide-react";

const HomeScreen = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-claret-500 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-onyx-700 montserrat-semibold">
              PrepPortal
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-onyx-600 hover:text-claret-500 transition-colors montserrat-regular"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-onyx-600 hover:text-claret-500 transition-colors montserrat-regular"
            >
              Success Stories
            </a>
            <Link
              href="/login"
              className="text-onyx-600 hover:text-claret-500 transition-colors montserrat-regular"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="bg-claret-500 text-white hover:bg-claret-600 font-medium px-6 py-2 rounded-lg transition-all duration-200 hover:shadow-lg montserrat-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>{" "}
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-alabaster-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 bg-tea-green-100 text-tea-green-700 rounded-full text-sm font-medium montserrat-medium">
                  <Star className="w-4 h-4 mr-2" />
                  Trusted by 10,000+ students
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-onyx-700 leading-tight montserrat-bold">
                  Master Your
                  <span className="text-claret-500 block">
                    Dream Job Journey
                  </span>
                </h1>
                <p className="text-xl text-onyx-600 leading-relaxed max-w-lg montserrat-regular">
                  Transform your career with AI-powered coaching, personalized
                  learning paths, and real-time practice with top company
                  questions.
                </p>
              </div>{" "}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/register"
                  className="bg-claret-500 text-white hover:bg-claret-600 px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg flex items-center justify-center montserrat-semibold"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <button
                  onClick={() => console.log("Demo coming soon")}
                  className="border-2 border-onyx-200 text-onyx-700 hover:bg-onyx-50 px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:border-onyx-300 montserrat-semibold"
                >
                  Watch Demo
                </button>
              </div>
              {/* Stats */}
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-claret-500 montserrat-bold">
                    95%
                  </div>
                  <div className="text-sm text-onyx-600 montserrat-regular">
                    Success Rate
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-claret-500 montserrat-bold">
                    500+
                  </div>
                  <div className="text-sm text-onyx-600 montserrat-regular">
                    Companies
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-claret-500 montserrat-bold">
                    24/7
                  </div>
                  <div className="text-sm text-onyx-600 montserrat-regular">
                    AI Support
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-alabaster-200">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-onyx-600 montserrat-medium">
                      Today's Challenge
                    </span>
                    <span className="px-2 py-1 bg-claret-100 text-claret-700 text-xs rounded-full montserrat-medium">
                      Hard
                    </span>
                  </div>
                  <h3 className="font-semibold text-onyx-700 montserrat-semibold">
                    Binary Tree Maximum Path Sum
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-onyx-600 montserrat-regular">
                    <span>⏱️ 30 mins</span>
                    <span>🏆 100 points</span>
                  </div>
                  <div className="bg-alabaster-50 p-4 rounded-lg">
                    <code className="text-sm text-onyx-700 montserrat-regular">
                      def maxPathSum(root):
                      <br />
                      &nbsp;&nbsp;# Your solution here...
                    </code>
                  </div>
                  <button className="w-full bg-claret-500 text-white py-3 rounded-lg font-medium hover:bg-claret-600 transition-colors montserrat-medium">
                    Start Solving
                  </button>
                </div>
              </div>
              {/* Floating elements - simplified */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-tea-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-tea-green-500" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-claret-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-claret-500" />
              </div>{" "}
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-onyx-700 mb-4 montserrat-bold">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-onyx-600 max-w-2xl mx-auto montserrat-regular">
              Our comprehensive platform combines cutting-edge AI with proven
              methodologies to accelerate your career growth.
            </p>
          </div>{" "}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="group p-8 rounded-2xl border border-alabaster-200 hover:border-claret-200 hover:shadow-lg transition-all duration-200">
              <div className="w-16 h-16 bg-claret-100 rounded-2xl flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-claret-600" />
              </div>
              <h3 className="text-xl font-semibold text-onyx-700 mb-3 montserrat-semibold">
                AI Interview Coach
              </h3>
              <p className="text-onyx-600 leading-relaxed montserrat-regular">
                Practice with our advanced AI that simulates real interview
                scenarios and provides personalized feedback to improve your
                performance.
              </p>
            </div>

            <div className="group p-8 rounded-2xl border border-alabaster-200 hover:border-tea-green-200 hover:shadow-lg transition-all duration-200">
              <div className="w-16 h-16 bg-tea-green-100 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-tea-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-onyx-700 mb-3 montserrat-semibold">
                Company-Specific Prep
              </h3>
              <p className="text-onyx-600 leading-relaxed montserrat-regular">
                Access curated question banks from top companies like Google,
                Microsoft, and Amazon with detailed solution explanations.
              </p>
            </div>

            <div className="group p-8 rounded-2xl border border-alabaster-200 hover:border-onyx-200 hover:shadow-lg transition-all duration-200">
              <div className="w-16 h-16 bg-onyx-100 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-onyx-600" />
              </div>
              <h3 className="text-xl font-semibold text-onyx-700 mb-3 montserrat-semibold">
                Peer Competition
              </h3>
              <p className="text-onyx-600 leading-relaxed montserrat-regular">
                Join live coding battles, participate in weekly contests, and
                climb the leaderboard with thousands of motivated peers.
              </p>
            </div>
          </div>
        </div>
      </section>{" "}
      {/* CTA Section */}
      <section className="py-20 bg-claret-500">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4 montserrat-bold">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto montserrat-regular">
            Join thousands of successful candidates who've landed their dream
            jobs with PrepPortal.
          </p>{" "}
          <Link
            href="/login"
            className="bg-white text-claret-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-alabaster-50 transition-all duration-200 hover:shadow-lg inline-flex items-center montserrat-semibold"
          >
            Start Your Journey Today
            <ArrowRight className="w-5 h-5 ml-3" />
          </Link>
          {/* Trust indicators */}
          <div className="mt-8 flex justify-center items-center space-x-8 text-white/80 text-sm">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span className="montserrat-regular">
                No Credit Card Required
              </span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span className="montserrat-regular">Free 14-Day Trial</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span className="montserrat-regular">Cancel Anytime</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
