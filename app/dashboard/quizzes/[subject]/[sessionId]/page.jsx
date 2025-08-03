"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";

// Mock quiz data for demonstration
const mockQuizData = {
  Networking: [
    {
      id: 1,
      question: "What does TCP stand for?",
      options: [
        "Transmission Control Protocol",
        "Transfer Control Protocol",
        "Technical Control Protocol",
        "Total Control Protocol",
      ],
      correct: 0,
    },
    {
      id: 2,
      question: "Which layer of the OSI model handles routing?",
      options: [
        "Physical Layer",
        "Data Link Layer",
        "Network Layer",
        "Transport Layer",
      ],
      correct: 2,
    },
  ],
  OOPS: [
    {
      id: 1,
      question: "What is encapsulation in OOP?",
      options: [
        "Data hiding",
        "Code reusability",
        "Multiple inheritance",
        "Method overloading",
      ],
      correct: 0,
    },
    {
      id: 2,
      question:
        "Which concept allows a class to inherit properties from another class?",
      options: ["Encapsulation", "Polymorphism", "Inheritance", "Abstraction"],
      correct: 2,
    },
  ],
  OS: [
    {
      id: 1,
      question: "What is a process in operating systems?",
      options: [
        "A program in execution",
        "A stored program",
        "A system call",
        "A memory location",
      ],
      correct: 0,
    },
    {
      id: 2,
      question:
        "Which scheduling algorithm gives the shortest job first priority?",
      options: ["FCFS", "SJF", "Round Robin", "Priority"],
      correct: 1,
    },
  ],
  DBMS: [
    {
      id: 1,
      question: "What does ACID stand for in database systems?",
      options: [
        "Atomicity, Consistency, Isolation, Durability",
        "Access, Control, Integrity, Data",
        "Atomic, Consistent, Independent, Durable",
        "All, Complete, Individual, Dependent",
      ],
      correct: 0,
    },
    {
      id: 2,
      question: "Which normal form eliminates partial dependency?",
      options: ["1NF", "2NF", "3NF", "BCNF"],
      correct: 1,
    },
  ],
};

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();

  // State management
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
  const [questions, setQuestions] = useState([]);

  const timerRef = useRef(null);

  // Extract params
  const { subject, sessionId } = params;

  // Initialize quiz session or load existing one
  useEffect(() => {
    const initializeQuiz = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get question count from URL params if provided
        const urlParams = new URLSearchParams(window.location.search);
        const count = parseInt(urlParams.get("count")) || 10;

        // Mock quiz initialization
        const subjectQuestions = mockQuizData[subject] || [];
        const limitedQuestions = subjectQuestions.slice(
          0,
          Math.min(count, subjectQuestions.length)
        );

        setQuestions(limitedQuestions);
        setQuizSession({
          quizSessionId: `mock-session-${Date.now()}`,
          subject,
          totalQuestions: limitedQuestions.length,
          startedAt: new Date().toISOString(),
        });

        // Load first question
        if (limitedQuestions.length > 0) {
          setCurrentQuestion(limitedQuestions[0]);
          setCurrentQuestionIndex(0);
        } else {
          setError(`No questions available for ${subject}`);
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

  // Load current question from local data
  const loadCurrentQuestion = async (questionIndex = currentQuestionIndex) => {
    try {
      if (questionIndex >= questions.length) {
        // Quiz completed
        setQuizCompleted(true);
        setShowResults(true);
        return;
      }

      const questionData = questions[questionIndex];
      setCurrentQuestion(questionData);
      setCurrentQuestionIndex(questionIndex);
    } catch (error) {
      console.error("Failed to load question:", error);
      setError(error.message);
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

      // Check if answer is correct
      const currentQ = questions[currentQuestionIndex];
      const isCorrect = answerIndex === currentQ.correct;

      if (isCorrect) {
        setScore((prev) => prev + 1);
      }

      // Add delay to show selection feedback
      setTimeout(async () => {
        const nextIndex = currentQuestionIndex + 1;

        if (nextIndex >= questions.length) {
          // Quiz is completed
          setQuizCompleted(true);
          setShowResults(true);
        } else {
          // Load next question
          await loadCurrentQuestion(nextIndex);
        }
      }, 1200);
    } catch (error) {
      console.error("Failed to process answer:", error);
      setError(error.message);
    }
  };

  // Handle time up
  const handleTimeUp = async () => {
    try {
      // Move to next question on timeout
      const nextIndex = currentQuestionIndex + 1;

      if (nextIndex >= questions.length) {
        setQuizCompleted(true);
        setShowResults(true);
      } else {
        await loadCurrentQuestion(nextIndex);
      }
    } catch (error) {
      console.error("Failed to handle timeout:", error);
      setError(error.message);
    }
  };

  // Handle quiz submission
  const handleSubmitQuiz = async () => {
    try {
      setQuizCompleted(true);
      setShowResults(true);
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
    const totalQuestions = questions.length;
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
              Question {currentQuestionIndex + 1} of {questions.length}
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
                ((currentQuestionIndex + 1) / questions.length) * 100
              )}
              %
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-claret-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / questions.length) * 100
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

          {currentQuestionIndex === questions.length - 1 && (
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
