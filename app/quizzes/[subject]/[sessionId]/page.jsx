"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import quizService from "../../../../lib/services/quizService";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();

  // State management
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizSession, setQuizSession] = useState(null);

  const timerRef = useRef(null);

  // Extract params
  const { subject, sessionId } = params;

  // Initialize quiz session or load existing one
  useEffect(() => {
    const initializeQuiz = async () => {
      try {
        setLoading(true);
        setError(null);

        // If sessionId is 'new', start a new quiz session
        if (sessionId === "new") {
          console.log("Starting new quiz session for subject:", subject);

          // Get question count from URL params if provided
          const urlParams = new URLSearchParams(window.location.search);
          const count = parseInt(urlParams.get("count")) || 10;

          const sessionData = await quizService.startQuiz(subject, count);
          console.log("New quiz session started:", sessionData);

          setQuizSession(sessionData);

          // Redirect to the actual session ID URL
          router.replace(
            `/quizzes/${subject}/${sessionData.quizSessionId}?count=${count}`
          );
        } else {
          // Load existing quiz session
          console.log("Loading existing quiz session:", sessionId);
          setQuizSession({ quizSessionId: sessionId });
          await loadCurrentQuestion(sessionId);
        }
      } catch (error) {
        console.error("Failed to initialize quiz:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (subject && sessionId) {
      initializeQuiz();
    }
  }, [subject, sessionId, router]);

  // Load current question from backend
  const loadCurrentQuestion = async (currentSessionId) => {
    try {
      const sessionId = currentSessionId || quizSession?.quizSessionId;
      if (!sessionId) {
        throw new Error("No active quiz session");
      }

      console.log("Loading question for session:", sessionId);
      const questionData = await quizService.getQuestion(sessionId);
      console.log("Question data received:", questionData);

      setCurrentQuestion(questionData.question);
      setCurrentQuestionIndex(questionData.questionNumber - 1);

      // Update quiz session data if available
      if (questionData.totalQuestions) {
        setQuizSession((prev) => ({
          ...prev,
          totalQuestions: questionData.totalQuestions,
        }));
      }
    } catch (error) {
      console.error("Failed to load question:", error);

      // If quiz is completed, show results
      if (
        error.message.includes("completed") ||
        error.message.includes("400")
      ) {
        setQuizCompleted(true);
        setShowResults(true);
      } else {
        setError(error.message);
      }
    }
  };

  // Start timer
  useEffect(() => {
    if (currentQuestion && !quizCompleted && !showResults) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [currentQuestion, quizCompleted, showResults]);

  // Handle answer selection
  const handleAnswerSelect = async (questionId, answerIndex) => {
    try {
      // Store the selected answer locally
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionId]: answerIndex,
      }));

      // Submit answer to backend
      const result = await quizService.submitAnswer(
        quizSession.quizSessionId,
        answerIndex
      );
      console.log("Answer submission result:", result);

      // Add delay to show selection feedback
      setTimeout(async () => {
        if (result.completed) {
          // Quiz is completed
          setQuizCompleted(true);
          setShowResults(true);

          // Display final results
          if (result.finalResults) {
            setScore(result.finalResults.correctAnswers);
            // Additional result data can be stored here
          }
        } else {
          // Load next question
          await loadCurrentQuestion();
        }
      }, 1200);
    } catch (error) {
      console.error("Failed to submit answer:", error);
      setError(error.message);
    }
  };

  // Handle time up
  const handleTimeUp = async () => {
    try {
      if (quizSession?.quizSessionId && currentQuestion) {
        // Submit null answer for timeout
        await quizService.submitAnswer(quizSession.quizSessionId, null);
        await loadCurrentQuestion();
      }
    } catch (error) {
      console.error("Failed to handle timeout:", error);
      setError(error.message);
    }
  };

  // Handle quiz submission
  const handleSubmitQuiz = async () => {
    try {
      const result = await quizService.completeQuiz(quizSession.quizSessionId);
      setQuizCompleted(true);
      setShowResults(true);

      if (result.finalResults) {
        setScore(result.finalResults.correctAnswers);
      }
    } catch (error) {
      console.error("Failed to submit quiz:", error);
      setError(error.message);
    }
  };

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle back to quizzes
  const handleBackToQuizzes = () => {
    router.push("/quizzes");
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl montserrat-bold text-onyx-700 mb-4">
            Loading Quiz...
          </h1>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-claret-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl montserrat-bold text-red-600 mb-4">
            Error Loading Quiz
          </h1>
          <p className="text-onyx-600 mb-4">{error}</p>
          <button
            onClick={handleBackToQuizzes}
            className="px-6 py-2 bg-claret-500 text-white rounded-lg hover:bg-claret-600 transition-colors"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  // Quiz completed state
  if (quizCompleted && showResults) {
    const totalQuestions = quizSession?.totalQuestions || 0;
    const percentage =
      totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg text-center">
          <h1 className="text-3xl montserrat-bold text-onyx-700 mb-6">
            Quiz Completed!
          </h1>

          <div className="mb-8">
            <div className="text-6xl font-bold text-claret-500 mb-2">
              {percentage}%
            </div>
            <div className="text-onyx-600">
              {score} out of {totalQuestions} correct
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleBackToQuizzes}
              className="px-6 py-3 bg-claret-500 text-white rounded-lg hover:bg-claret-600 transition-colors montserrat-medium"
            >
              Back to Quizzes
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 border border-claret-500 text-claret-500 rounded-lg hover:bg-claret-50 transition-colors montserrat-medium"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main quiz interface
  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl montserrat-bold text-onyx-700">
              {subject} Quiz
            </h1>
            <p className="text-onyx-600">
              Question {currentQuestionIndex + 1} of{" "}
              {quizSession?.totalQuestions || "..."}
            </p>
          </div>

          <div className="text-right">
            <div className="text-lg montserrat-medium text-onyx-700">
              Time Left: {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* Question */}
        {currentQuestion && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-xl montserrat-medium text-onyx-700 mb-6">
              {currentQuestion.question}
            </h2>

            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                    selectedAnswers[currentQuestion.id] === index
                      ? "border-claret-500 bg-claret-50"
                      : "border-gray-200 hover:border-claret-300 hover:bg-claret-25"
                  }`}
                >
                  <span className="font-medium text-onyx-700">
                    {String.fromCharCode(65 + index)}. {option}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-onyx-600">Progress</span>
            <span className="text-sm text-onyx-600">
              {Math.round(
                ((currentQuestionIndex + 1) /
                  (quizSession?.totalQuestions || 1)) *
                  100
              )}
              %
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-claret-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) /
                    (quizSession?.totalQuestions || 1)) *
                  100
                }%`,
              }}
            ></div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleBackToQuizzes}
            className="px-6 py-2 border border-onyx-300 text-onyx-600 rounded-lg hover:bg-onyx-50 transition-colors"
          >
            Exit Quiz
          </button>

          {currentQuestionIndex === quizSession?.totalQuestions - 1 && (
            <button
              onClick={handleSubmitQuiz}
              className="px-6 py-2 bg-claret-500 text-white rounded-lg hover:bg-claret-600 transition-colors montserrat-medium"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
