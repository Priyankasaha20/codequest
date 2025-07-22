"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, CheckCircle, XCircle } from "lucide-react";

// Dummy quiz data for each subject
const quizData = {
  "computer-networks": [
    {
      id: 1,
      question: "What is the maximum number of hosts in a /24 network?",
      options: ["254", "255", "256", "253"],
      correct: 0,
      explanation:
        "In a /24 network, there are 8 bits for host addresses, giving 2^8 = 256 addresses. Subtract 2 for network and broadcast addresses, leaving 254 usable host addresses.",
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
      explanation:
        "The Network Layer (Layer 3) is responsible for routing packets between different networks.",
    },
    {
      id: 3,
      question: "What is the default port for HTTP?",
      options: ["21", "22", "80", "443"],
      correct: 2,
      explanation: "HTTP uses port 80 by default, while HTTPS uses port 443.",
    },
    {
      id: 4,
      question: "Which protocol is connectionless?",
      options: ["TCP", "UDP", "HTTP", "FTP"],
      correct: 1,
      explanation:
        "UDP (User Datagram Protocol) is connectionless, while TCP is connection-oriented.",
    },
    {
      id: 5,
      question: "What does ARP stand for?",
      options: [
        "Address Resolution Protocol",
        "Automatic Routing Protocol",
        "Advanced Routing Protocol",
        "Address Routing Protocol",
      ],
      correct: 0,
      explanation:
        "ARP stands for Address Resolution Protocol, which maps IP addresses to MAC addresses.",
    },
    {
      id: 6,
      question: "Which topology provides the highest fault tolerance?",
      options: ["Star", "Ring", "Bus", "Mesh"],
      correct: 3,
      explanation:
        "Mesh topology provides the highest fault tolerance as every node is connected to every other node.",
    },
    {
      id: 7,
      question: "What is the purpose of subnetting?",
      options: [
        "Increase network speed",
        "Reduce network traffic",
        "Improve security",
        "All of the above",
      ],
      correct: 3,
      explanation:
        "Subnetting helps reduce network traffic, improve security, and can indirectly improve network performance.",
    },
    {
      id: 8,
      question: "Which cable type is immune to electromagnetic interference?",
      options: [
        "Coaxial",
        "Twisted Pair",
        "Fiber Optic",
        "Shielded Twisted Pair",
      ],
      correct: 2,
      explanation:
        "Fiber optic cables use light signals and are immune to electromagnetic interference.",
    },
    {
      id: 9,
      question: "What is the maximum length of a UTP cable segment?",
      options: ["100 meters", "200 meters", "500 meters", "1000 meters"],
      correct: 0,
      explanation:
        "UTP (Unshielded Twisted Pair) cable has a maximum recommended length of 100 meters.",
    },
    {
      id: 10,
      question: "Which protocol is used for network time synchronization?",
      options: ["NTP", "SNMP", "DHCP", "DNS"],
      correct: 0,
      explanation:
        "NTP (Network Time Protocol) is used for synchronizing clocks across networks.",
    },
  ],
  oop: [
    {
      id: 1,
      question: "What is encapsulation in OOP?",
      options: [
        "Hiding implementation details",
        "Creating multiple objects",
        "Inheriting properties",
        "Overriding methods",
      ],
      correct: 0,
      explanation:
        "Encapsulation is the principle of hiding implementation details and exposing only necessary interfaces.",
    },
    {
      id: 2,
      question:
        "Which principle allows a class to inherit properties from another class?",
      options: ["Polymorphism", "Encapsulation", "Inheritance", "Abstraction"],
      correct: 2,
      explanation:
        "Inheritance allows a class to inherit properties and methods from a parent class.",
    },
    {
      id: 3,
      question: "What is method overriding?",
      options: [
        "Creating multiple methods with same name",
        "Redefining a method in subclass",
        "Calling parent method",
        "Creating abstract methods",
      ],
      correct: 1,
      explanation:
        "Method overriding is redefining a method in a subclass that was already defined in the parent class.",
    },
    {
      id: 4,
      question: "What is polymorphism?",
      options: [
        "One interface, multiple implementations",
        "Multiple inheritance",
        "Data hiding",
        "Method overloading",
      ],
      correct: 0,
      explanation:
        "Polymorphism means 'one interface, multiple implementations' - the ability to present the same interface for different underlying forms.",
    },
    {
      id: 5,
      question: "What is an abstract class?",
      options: [
        "A class with no methods",
        "A class that cannot be instantiated",
        "A class with only static methods",
        "A class with private methods",
      ],
      correct: 1,
      explanation:
        "An abstract class is a class that cannot be instantiated and is meant to be subclassed.",
    },
    {
      id: 6,
      question: "What is the difference between overloading and overriding?",
      options: [
        "No difference",
        "Overloading is compile-time, overriding is runtime",
        "Overloading is runtime, overriding is compile-time",
        "Both are compile-time",
      ],
      correct: 1,
      explanation:
        "Method overloading is resolved at compile-time, while method overriding is resolved at runtime.",
    },
    {
      id: 7,
      question: "What is composition in OOP?",
      options: [
        "Creating objects inside other objects",
        "Inheriting from multiple classes",
        "Overriding methods",
        "Creating interfaces",
      ],
      correct: 0,
      explanation:
        "Composition is a design principle where objects are composed of other objects, representing a 'has-a' relationship.",
    },
    {
      id: 8,
      question: "What is the purpose of constructors?",
      options: [
        "Destroy objects",
        "Initialize objects",
        "Copy objects",
        "Override methods",
      ],
      correct: 1,
      explanation:
        "Constructors are special methods used to initialize objects when they are created.",
    },
    {
      id: 9,
      question: "What is aggregation?",
      options: [
        "Strong composition",
        "Weak composition",
        "Inheritance",
        "Polymorphism",
      ],
      correct: 1,
      explanation:
        "Aggregation is a weak form of composition where objects can exist independently.",
    },
    {
      id: 10,
      question: "What is the diamond problem in OOP?",
      options: [
        "Memory leak",
        "Multiple inheritance ambiguity",
        "Circular dependency",
        "Stack overflow",
      ],
      correct: 1,
      explanation:
        "The diamond problem occurs in multiple inheritance when a class inherits from two classes that have a common base class.",
    },
  ],
  os: [
    {
      id: 1,
      question: "What is the main function of an operating system?",
      options: [
        "Compile programs",
        "Manage hardware resources",
        "Create applications",
        "Design user interfaces",
      ],
      correct: 1,
      explanation:
        "The main function of an OS is to manage hardware resources and provide an interface between users and hardware.",
    },
    {
      id: 2,
      question: "What is a process in operating systems?",
      options: [
        "A program in execution",
        "A file on disk",
        "A hardware component",
        "A user interface",
      ],
      correct: 0,
      explanation:
        "A process is a program in execution, loaded into memory and being executed by the CPU.",
    },
    {
      id: 3,
      question: "What is the difference between a process and a thread?",
      options: [
        "No difference",
        "Process is lighter than thread",
        "Thread is lighter than process",
        "Both are the same weight",
      ],
      correct: 2,
      explanation:
        "Threads are lighter than processes as they share memory space and resources within a process.",
    },
    {
      id: 4,
      question: "What is deadlock?",
      options: [
        "Process termination",
        "Circular waiting for resources",
        "Memory overflow",
        "CPU scheduling",
      ],
      correct: 1,
      explanation:
        "Deadlock is a situation where processes are waiting for each other in a circular manner, preventing progress.",
    },
    {
      id: 5,
      question:
        "Which scheduling algorithm gives the shortest average waiting time?",
      options: ["FCFS", "SJF", "Round Robin", "Priority"],
      correct: 1,
      explanation:
        "SJF (Shortest Job First) gives the shortest average waiting time among all scheduling algorithms.",
    },
    {
      id: 6,
      question: "What is virtual memory?",
      options: [
        "RAM memory",
        "Hard disk space",
        "Illusion of larger memory",
        "Cache memory",
      ],
      correct: 2,
      explanation:
        "Virtual memory creates an illusion of larger memory by using disk space as an extension of RAM.",
    },
    {
      id: 7,
      question: "What is thrashing?",
      options: [
        "Fast processing",
        "Excessive page faults",
        "Memory allocation",
        "Process creation",
      ],
      correct: 1,
      explanation:
        "Thrashing occurs when a system spends more time swapping pages than executing processes due to excessive page faults.",
    },
    {
      id: 8,
      question: "What is the purpose of semaphores?",
      options: [
        "Memory management",
        "Process synchronization",
        "File management",
        "I/O operations",
      ],
      correct: 1,
      explanation:
        "Semaphores are used for process synchronization and controlling access to shared resources.",
    },
    {
      id: 9,
      question:
        "What is the difference between preemptive and non-preemptive scheduling?",
      options: [
        "No difference",
        "Preemptive allows interruption",
        "Non-preemptive allows interruption",
        "Both allow interruption",
      ],
      correct: 1,
      explanation:
        "Preemptive scheduling allows the OS to interrupt a running process, while non-preemptive scheduling does not.",
    },
    {
      id: 10,
      question: "What is a race condition?",
      options: [
        "Fast execution",
        "Outcome depends on timing",
        "Memory leak",
        "Process termination",
      ],
      correct: 1,
      explanation:
        "A race condition occurs when the outcome of a program depends on the relative timing of events.",
    },
  ],
  dbms: [
    {
      id: 1,
      question: "What does ACID stand for in database transactions?",
      options: [
        "Atomicity, Consistency, Isolation, Durability",
        "Accuracy, Completeness, Integrity, Dependability",
        "Authentication, Correctness, Independence, Durability",
        "Atomicity, Correctness, Isolation, Dependability",
      ],
      correct: 0,
      explanation:
        "ACID stands for Atomicity, Consistency, Isolation, and Durability - the four properties that guarantee database transactions are processed reliably.",
    },
    {
      id: 2,
      question: "What is normalization in databases?",
      options: [
        "Data encryption",
        "Organizing data to reduce redundancy",
        "Creating indexes",
        "Backing up data",
      ],
      correct: 1,
      explanation:
        "Normalization is the process of organizing data in a database to reduce redundancy and dependency.",
    },
    {
      id: 3,
      question: "What is the difference between DELETE and TRUNCATE?",
      options: [
        "No difference",
        "DELETE removes all rows, TRUNCATE removes specific rows",
        "DELETE can be rolled back, TRUNCATE cannot",
        "TRUNCATE is slower than DELETE",
      ],
      correct: 2,
      explanation:
        "DELETE can be rolled back and removes rows conditionally, while TRUNCATE removes all rows and cannot be rolled back.",
    },
    {
      id: 4,
      question: "What is a primary key?",
      options: [
        "Most important column",
        "Unique identifier for rows",
        "First column in table",
        "Foreign key reference",
      ],
      correct: 1,
      explanation:
        "A primary key is a unique identifier for each row in a table, ensuring no duplicate values.",
    },
    {
      id: 5,
      question: "What is the difference between INNER JOIN and LEFT JOIN?",
      options: [
        "No difference",
        "INNER JOIN returns all rows, LEFT JOIN returns matching rows",
        "INNER JOIN returns matching rows, LEFT JOIN returns all rows from left table",
        "LEFT JOIN is faster",
      ],
      correct: 2,
      explanation:
        "INNER JOIN returns only matching rows from both tables, while LEFT JOIN returns all rows from the left table plus matching rows from the right table.",
    },
    {
      id: 6,
      question: "What is indexing in databases?",
      options: [
        "Sorting data",
        "Creating shortcuts for faster retrieval",
        "Backing up data",
        "Encrypting data",
      ],
      correct: 1,
      explanation:
        "Indexing creates data structures that improve the speed of data retrieval operations on a database table.",
    },
    {
      id: 7,
      question: "What is a foreign key?",
      options: [
        "Primary key from another table",
        "Unique identifier",
        "Encrypted key",
        "Backup key",
      ],
      correct: 0,
      explanation:
        "A foreign key is a field that refers to the primary key of another table, establishing a link between tables.",
    },
    {
      id: 8,
      question: "What is the purpose of transactions in databases?",
      options: [
        "Speed up queries",
        "Ensure data consistency",
        "Reduce storage space",
        "Improve security",
      ],
      correct: 1,
      explanation:
        "Transactions ensure data consistency by grouping database operations that must all succeed or all fail together.",
    },
    {
      id: 9,
      question:
        "What is the difference between clustered and non-clustered indexes?",
      options: [
        "No difference",
        "Clustered physically orders data, non-clustered doesn't",
        "Non-clustered is faster",
        "Clustered is for numbers only",
      ],
      correct: 1,
      explanation:
        "Clustered indexes physically order the data in the table, while non-clustered indexes create a separate structure pointing to the data.",
    },
    {
      id: 10,
      question: "What is deadlock in databases?",
      options: [
        "Database crash",
        "Two transactions waiting for each other",
        "Slow query",
        "Memory overflow",
      ],
      correct: 1,
      explanation:
        "Database deadlock occurs when two or more transactions are waiting for each other to release locks, creating a circular dependency.",
    },
  ],
};

// Subject titles mapping
const subjectTitles = {
  "computer-networks": "Computer Networks",
  oop: "Object-Oriented Programming",
  os: "Operating Systems",
  dbms: "Database Management Systems",
};

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { subject, sessionId } = params;
  const questionCount = parseInt(searchParams.get("count") || "10");

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(questionCount * 90); // 90 seconds per question
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Get random questions for the selected subject
    const allQuestions = quizData[subject] || [];
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, questionCount);
    setQuestions(selectedQuestions);
  }, [subject, questionCount]);

  useEffect(() => {
    if (quizCompleted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizCompleted]);

  const handleTimeUp = () => {
    setQuizCompleted(true);
    calculateScore();
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    if (quizCompleted || isTransitioning) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));

    // Add a subtle haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    setIsTransitioning(true);

    // Auto-advance to next question after a short delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setIsTransitioning(false);
      } else {
        // If this was the last question, submit the quiz
        setQuizCompleted(true);
        calculateScore();
      }
    }, 1200); // 1200ms delay to show selection feedback
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correct) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setShowResults(true);
  };

  const handleSubmitQuiz = () => {
    setQuizCompleted(true);
    calculateScore();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleBackToQuizzes = () => {
    router.push("/quizzes");
  };

  if (questions.length === 0) {
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

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-background p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card text-center mb-6"
          >
            <div className="card-content">
              <h1 className="text-3xl montserrat-bold text-onyx-700 mb-4">
                Quiz Completed!
              </h1>
              <div className="text-6xl mb-4">
                {score / questions.length >= 0.8
                  ? "🎉"
                  : score / questions.length >= 0.6
                  ? "👍"
                  : "📚"}
              </div>
              <h2 className="text-2xl montserrat-semibold text-onyx-700 mb-2">
                {subjectTitles[subject]}
              </h2>
              <div className="text-4xl montserrat-bold text-claret-600 mb-4">
                {score}/{questions.length}
              </div>
              <div className="text-lg text-onyx-600 mb-6">
                {Math.round((score / questions.length) * 100)}% Correct
              </div>

              <button
                onClick={handleBackToQuizzes}
                className="btn-primary montserrat-semibold"
              >
                Back to Quizzes
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <div className="card-content">
              <h3 className="text-xl montserrat-bold text-onyx-700 mb-4">
                Review Your Answers
              </h3>
              <div className="space-y-4">
                {questions.map((question, index) => {
                  const userAnswer = selectedAnswers[question.id];
                  const isCorrect = userAnswer === question.correct;

                  return (
                    <div
                      key={question.id}
                      className="border border-alabaster-300 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm montserrat-semibold text-onyx-500">
                          Question {index + 1}
                        </span>
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-tea-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                      <p className="text-onyx-700 montserrat-medium mb-3">
                        {question.question}
                      </p>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-2 rounded ${
                              optionIndex === question.correct
                                ? "bg-tea-green-100 text-tea-green-800"
                                : optionIndex === userAnswer && !isCorrect
                                ? "bg-red-100 text-red-800"
                                : "bg-alabaster-50 text-onyx-600"
                            }`}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 p-3 bg-blue-50 rounded">
                        <p className="text-sm text-blue-800">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="card mb-6">
          <div className="card-content">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl montserrat-bold text-onyx-700">
                {subjectTitles[subject]}
              </h1>
              <div className="flex items-center text-onyx-600">
                <Clock className="w-5 h-5 mr-2" />
                <span className="montserrat-semibold text-lg">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-sm montserrat-medium text-onyx-500">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm montserrat-medium text-onyx-500">
                Session: {sessionId.split("_")[2]}
              </span>
            </div>

            <div className="w-full bg-alabaster-200 rounded-full h-2">
              <div
                className="bg-claret-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="card mb-6"
        >
          <div className="card-content">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-claret-500 text-white rounded-full flex items-center justify-center text-sm montserrat-bold">
                  {currentQuestion + 1}
                </div>
                <span className="text-sm text-onyx-500 montserrat-medium">
                  of {questions.length}
                </span>
              </div>
              {currentQuestion === questions.length - 1 && (
                <span className="text-sm text-claret-600 montserrat-semibold bg-claret-50 px-3 py-1 rounded-full">
                  Final Question
                </span>
              )}
            </div>

            <h2 className="text-xl montserrat-semibold text-onyx-700 mb-6">
              {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswers[question.id] === index;
                return (
                  <motion.button
                    key={index}
                    data-option={index}
                    onClick={() => handleAnswerSelect(question.id, index)}
                    disabled={
                      isTransitioning ||
                      selectedAnswers[question.id] !== undefined
                    }
                    initial={false}
                    animate={{
                      scale: isSelected ? 1.02 : 1,
                      backgroundColor: isSelected ? "#fef2f2" : "#ffffff",
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                      isSelected
                        ? "border-claret-500 bg-claret-100 text-claret-800 shadow-lg ring-2 ring-claret-200"
                        : selectedAnswers[question.id] !== undefined
                        ? "border-alabaster-200 bg-alabaster-50 text-onyx-400 cursor-not-allowed"
                        : "border-alabaster-300 hover:border-claret-300 hover:bg-claret-25 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center">
                      <span
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 text-sm montserrat-semibold transition-all duration-200 ${
                          isSelected
                            ? "border-claret-500 bg-claret-500 text-white transform scale-110 shadow-md"
                            : selectedAnswers[question.id] !== undefined
                            ? "border-alabaster-300 text-alabaster-400"
                            : "border-alabaster-400 text-onyx-600 hover:border-claret-400"
                        }`}
                      >
                        {isSelected ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </span>
                      <span
                        className={`montserrat-medium transition-all duration-200 ${
                          isSelected
                            ? "font-semibold text-claret-800"
                            : selectedAnswers[question.id] !== undefined
                            ? "text-onyx-400"
                            : "text-onyx-700"
                        }`}
                      >
                        {option}
                      </span>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                          className="ml-auto"
                        >
                          <div className="w-2 h-2 bg-claret-500 rounded-full"></div>
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Progress Indicator */}
        <div className="card">
          <div className="card-content">
            <div className="text-center">
              <div className="mb-4">
                <span className="text-sm text-onyx-500 montserrat-medium">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
              </div>
              <div className="flex justify-center items-center space-x-2 mb-4">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index < currentQuestion
                        ? "bg-tea-green-500"
                        : index === currentQuestion
                        ? "bg-claret-500 scale-150"
                        : "bg-alabaster-300"
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-onyx-500">
                {selectedAnswers[question.id] !== undefined
                  ? currentQuestion === questions.length - 1
                    ? "Submitting quiz..."
                    : "Moving to next question..."
                  : "Select an answer to continue"}
              </div>
              {isTransitioning && (
                <div className="mt-3">
                  <div className="inline-flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-claret-500"></div>
                    <span className="text-sm text-claret-600 montserrat-medium">
                      {currentQuestion === questions.length - 1
                        ? "Calculating results..."
                        : "Next question loading..."}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
