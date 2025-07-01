"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import {
  ArrowLeft,
  Github,
  Mail,
  Eye,
  EyeOff,
  Chrome,
  User,
  Lock,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const RegisterScreen = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isLoading, error, register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const watchPassword = watch("password");
  const watchConfirmPassword = watch("confirmPassword");

  const onSubmit = async (data) => {
    const success = await registerUser(data);
    if (success) router.push("/login?registered=true");
  };

  const handleGoogleAuth = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  const handleGitHubAuth = () => {
    signIn("github", { callbackUrl: "/dashboard" });
  };

  const passwordStrength = () => {
    const password = watchPassword || "";
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    return strength;
  };

  const getStrengthColor = () => {
    const strength = passwordStrength();
    if (strength <= 2) return "bg-red-500";
    if (strength <= 3) return "bg-yellow-500";
    if (strength <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    const strength = passwordStrength();
    if (strength <= 2) return "Weak";
    if (strength <= 3) return "Fair";
    if (strength <= 4) return "Good";
    return "Strong";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-alabaster-50 via-white to-timberwolf-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link
          href="/"
          className="flex items-center text-onyx-600 hover:text-claret-500 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        {/* Register Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-alabaster-200">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-claret-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">P</span>
            </div>
            <h1 className="text-2xl font-bold text-onyx-700">
              Create Your Account
            </h1>
            <p className="text-onyx-600 mt-2">
              Join thousands of students preparing for their dream careers
            </p>
          </div>

          {/* Social Registration Buttons */}
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
                Or create account with email
              </span>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {errors.root && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                {errors.root.message}
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-onyx-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-onyx-400" />
                <input
                  type="text"
                  {...register("name", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-claret-300 focus:border-claret-400 transition-all ${
                    errors.name ? "border-red-300" : "border-alabaster-200"
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-onyx-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-onyx-400" />
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please enter a valid email",
                    },
                  })}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-claret-300 focus:border-claret-400 transition-all ${
                    errors.email ? "border-red-300" : "border-alabaster-200"
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-onyx-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-onyx-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className={`w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 focus:ring-claret-300 focus:border-claret-400 transition-all ${
                    errors.password ? "border-red-300" : "border-alabaster-200"
                  }`}
                  placeholder="Create a strong password"
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

              {/* Password Strength Indicator */}
              {watchPassword && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                        style={{ width: `${(passwordStrength() / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-onyx-600">
                      {getStrengthText()}
                    </span>
                  </div>
                </div>
              )}

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-onyx-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-onyx-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watchPassword || "Passwords don't match",
                  })}
                  className={`w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 focus:ring-claret-300 focus:border-claret-400 transition-all ${
                    errors.confirmPassword
                      ? "border-red-300"
                      : "border-alabaster-200"
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-onyx-400 hover:text-onyx-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
              {watchConfirmPassword &&
                watchPassword === watchConfirmPassword && (
                  <div className="flex items-center mt-1 text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span className="text-sm">Passwords match</span>
                  </div>
                )}
            </div>

            {/* Terms Agreement */}
            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  {...register("agreeToTerms", {
                    required: "You must agree to the terms and conditions",
                  })}
                  className={`mt-1 mr-3 rounded ${
                    errors.agreeToTerms ? "border-red-300" : ""
                  }`}
                />
                <span className="text-sm text-onyx-600">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-claret-500 hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-claret-500 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.agreeToTerms.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-claret-500 hover:bg-claret-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-onyx-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-claret-500 hover:text-claret-600 font-medium"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Success Features */}
        <div className="mt-8 text-center">
          <p className="text-sm text-onyx-600 mb-4">Join students from</p>
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

export default RegisterScreen;
