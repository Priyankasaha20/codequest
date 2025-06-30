"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowLeft, Github, Mail, Eye, EyeOff, Chrome } from "lucide-react";

const LoginScreen = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // hardcode states like status
  const status = "authenticated"; // or "authenticated", "loading"

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleGoogleAuth = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  const handleGitHubAuth = () => {
    signIn("github", { callbackUrl: "/dashboard" });
  };

  // Show loading while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-alabaster-50 via-white to-timberwolf-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-claret-500"></div>
          <p className="mt-4 text-onyx-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-alabaster-50 via-white to-timberwolf-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {" "}
        {/* Back Button */}
        <Link
          href="/"
          className="flex items-center text-onyx-600 hover:text-claret-500 mb-8 transition-colors"
        >
          {" "}
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
        {/* Login Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-alabaster-200">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-claret-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">P</span>
            </div>
            <h1 className="text-2xl font-bold text-onyx-700">Welcome Back</h1>
            <p className="text-onyx-600 mt-2">
              Sign in to continue your preparation
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center px-4 py-3 border border-alabaster-300 rounded-xl hover:bg-alabaster-50 transition-all duration-200 group"
            >
              <Chrome className="w-5 h-5 text-claret-500 mr-3 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-onyx-700">
                Continue with Google
              </span>
            </button>

            <button
              onClick={handleGitHubAuth}
              className="w-full flex items-center justify-center px-4 py-3 border border-alabaster-300 rounded-xl hover:bg-alabaster-50 transition-all duration-200 group"
            >
              <Github className="w-5 h-5 text-onyx-700 mr-3 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-onyx-700">
                Continue with GitHub
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-alabaster-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-onyx-500">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-onyx-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-onyx-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-alabaster-200 rounded-xl focus:ring-2 focus:ring-claret-300 focus:border-claret-400 transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-onyx-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-10 border border-alabaster-200 rounded-xl focus:ring-2 focus:ring-claret-300 focus:border-claret-400 transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-onyx-400 hover:text-onyx-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 rounded" />
                <span className="text-sm text-onyx-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-claret-500 hover:text-claret-600"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-claret-500 hover:bg-claret-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
            >
              Sign In
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center mt-6">
            <p className="text-onyx-600">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-claret-500 hover:text-claret-600 font-medium"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
        {/* Success Features */}
        <div className="mt-8 text-center">
          <p className="text-sm text-onyx-600 mb-4">Trusted by students from</p>
          <div className="flex justify-center space-x-6 text-onyx-400">
            <span className="font-semibold">MIT</span>
            <span className="font-semibold">Stanford</span>
            <span className="font-semibold">Harvard</span>
            <span className="font-semibold">IIT</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
