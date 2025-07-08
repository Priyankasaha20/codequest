"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Play,
  Square,
  ArrowRight,
  CheckCircle,
  Camera,
  AlertCircle,
  Trophy,
  Clock,
  Target,
  Star,
} from "lucide-react";

const InterviewSessionPage = () => {
  const params = useParams();
  const router = useRouter();
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [sessionId] = useState(params.sessionId);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [hasVideoPermission, setHasVideoPermission] = useState(false);
  const [hasAudioPermission, setHasAudioPermission] = useState(false);
  const [permissionError, setPermissionError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [results, setResults] = useState(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [answers, setAnswers] = useState([]);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Client-side-only initialization
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Ensure we don't render browser-specific content during SSR
  const safelyCheckBrowserFeatures = () => {
    if (!isMounted) return false;
    return SpeechRecognition.browserSupportsSpeechRecognition();
  };

  // Load questions on mount
  useEffect(() => {
    console.log("Session page mounted with params:", params);
    console.log("Session ID from params:", sessionId);

    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        console.log(`Fetching questions from /api/coach/session/${sessionId}`);
        const { data } = await axios.get(`/api/coach/session/${sessionId}`);
        console.log("Questions data received:", data);
        setQuestions(data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setPermissionError(
          "Failed to load interview questions. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (sessionId) {
      fetchQuestions();
    } else {
      console.error("No session ID available");
      setPermissionError("Invalid interview session. Please start again.");
      setIsLoading(false);
    }
  }, [sessionId]);

  // Request media permissions - only on client-side
  useEffect(() => {
    if (!isMounted) return; // Skip during SSR

    const requestPermissions = async () => {
      try {
        console.log("Requesting media permissions...");

        // First try both video and audio
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });

          console.log("Both video and audio permissions granted");
          streamRef.current = stream;
          setHasVideoPermission(true);
          setHasAudioPermission(true);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            // Ensure autoplay works
            videoRef.current
              .play()
              .catch((e) => console.error("Video play failed:", e));
          }
        } catch (fullError) {
          console.error(
            "Full permission denied, trying audio only:",
            fullError
          );

          // Try audio only if both failed
          try {
            const audioStream = await navigator.mediaDevices.getUserMedia({
              video: false,
              audio: true,
            });

            console.log("Audio-only permission granted");
            streamRef.current = audioStream;
            setHasAudioPermission(true);
          } catch (audioError) {
            console.error("Audio permission also denied:", audioError);
            setPermissionError(
              "Microphone access is required for the interview. Please grant permission and reload."
            );
          }
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
        setPermissionError(
          "Camera and microphone access is required for the interview. Please ensure you're using a secure (HTTPS) connection."
        );
      }
    };

    requestPermissions();

    // Cleanup function to stop media streams when component unmounts
    return () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => track.stop());
        console.log("Media streams stopped");
      }
    };
  }, [isMounted, videoRef]);

  // Check browser support
  if (!safelyCheckBrowserFeatures()) {
    return (
      <div className="min-h-screen bg-gradient-background p-6 flex items-center justify-center">
        <div className="card max-w-md">
          <div className="card-content text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl montserrat-bold text-onyx-700 mb-2">
              Browser Not Supported
            </h2>
            <p className="text-onyx-600 mb-4">
              Your browser doesn't support speech recognition. Please use
              Chrome, Edge, or Safari.
            </p>
            <button
              onClick={() => router.push("/ai-coach")}
              className="bg-claret-500 hover:bg-claret-600 text-white px-6 py-2 rounded-lg"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Toggle video on/off
  const toggleVideo = () => {
    if (streamRef.current) {
      // Get video tracks
      const videoTracks = streamRef.current.getVideoTracks();

      // Toggle enabled state for all video tracks
      videoTracks.forEach((track) => {
        track.enabled = !isVideoEnabled;
      });

      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const startRecording = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    setIsRecording(true);
  };

  const stopRecording = async () => {
    SpeechRecognition.stopListening();
    setIsRecording(false);
    setIsSubmitting(true);

    try {
      await axios.post(`/api/coach/session/${sessionId}/answer`, {
        questionIndex: currentQuestionIndex,
        text: transcript,
      });

      // Store answer locally
      const newAnswer = {
        questionIndex: currentQuestionIndex,
        question: questions[currentQuestionIndex],
        answer: transcript,
      };
      setAnswers((prev) => [...prev, newAnswer]);

      // Move to next question or complete
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        resetTranscript();
      } else {
        // Complete interview
        await completeInterview();
      }
    } catch (error) {
      console.error("Failed to submit answer:", error);
      alert("Failed to submit answer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const completeInterview = async () => {
    try {
      const { data } = await axios.post(
        `/api/coach/session/${sessionId}/complete`
      );
      setResults(data);
      setInterviewComplete(true);

      // Stop media streams
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    } catch (error) {
      console.error("Failed to complete interview:", error);
      alert("Failed to complete interview. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-background p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-claret-500 mx-auto mb-4"></div>
          <p className="text-onyx-600">Loading interview session...</p>
        </div>
      </div>
    );
  }

  if (permissionError && !hasAudioPermission) {
    return (
      <div className="min-h-screen bg-gradient-background p-6 flex items-center justify-center">
        <div className="text-center max-w-md bg-white p-8 rounded-lg shadow-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl montserrat-bold text-onyx-700 mb-2">
            Permissions Required
          </h2>
          <p className="text-onyx-600 mb-4">{permissionError}</p>
          <div className="flex justify-center space-x-3">
            <button
              onClick={() => window.location.reload()}
              className="bg-claret-500 hover:bg-claret-600 text-white px-6 py-2 rounded-lg"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push("/ai-coach")}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (interviewComplete && results) {
    return (
      <div className="min-h-screen bg-gradient-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="card mb-6">
            <div className="card-content text-center">
              <CheckCircle className="w-16 h-16 text-tea-green-500 mx-auto mb-4" />
              <h1 className="text-2xl montserrat-bold text-onyx-700 mb-2">
                Interview Complete!
              </h1>
              <p className="text-onyx-600">
                Great job! Here's your performance summary.
              </p>
            </div>
          </div>

          {/* Results Summary */}
          {results.scores && (
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="card">
                <div className="card-content text-center">
                  <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <h3 className="montserrat-semibold text-onyx-700">
                    Overall Score
                  </h3>
                  <p className="text-2xl montserrat-bold text-claret-500">
                    {results.scores.overall}/10
                  </p>
                </div>
              </div>
              <div className="card">
                <div className="card-content text-center">
                  <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="montserrat-semibold text-onyx-700">
                    Technical Skills
                  </h3>
                  <p className="text-2xl montserrat-bold text-claret-500">
                    {results.scores.technical}/10
                  </p>
                </div>
              </div>
              <div className="card">
                <div className="card-content text-center">
                  <Star className="w-8 h-8 text-tea-green-500 mx-auto mb-2" />
                  <h3 className="montserrat-semibold text-onyx-700">
                    Communication
                  </h3>
                  <p className="text-2xl montserrat-bold text-claret-500">
                    {results.scores.communication}/10
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Summary */}
          {results.summary && (
            <div className="card mb-6">
              <div className="card-content">
                <h2 className="text-lg montserrat-semibold text-onyx-500 mb-4">
                  Performance Summary
                </h2>
                <p className="text-onyx-600">{results.summary}</p>
              </div>
            </div>
          )}

          {/* Questions and Answers */}
          <div className="card mb-6">
            <div className="card-content">
              <h2 className="text-lg montserrat-semibold text-onyx-500 mb-4">
                Interview Review
              </h2>
              <div className="space-y-6">
                {results.questions?.map((question, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-claret-200 pl-4"
                  >
                    <h3 className="montserrat-semibold text-onyx-700 mb-2">
                      Question {index + 1}
                    </h3>
                    <p className="text-onyx-600 mb-3">{question}</p>
                    <div className="bg-alabaster-50 p-3 rounded-lg mb-2">
                      <h4 className="text-sm montserrat-semibold text-onyx-600 mb-1">
                        Your Answer:
                      </h4>
                      <p className="text-onyx-700">
                        {results.answers?.[index] || "No answer recorded"}
                      </p>
                    </div>
                    {results.feedback?.[index] && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h4 className="text-sm montserrat-semibold text-blue-700 mb-1">
                          Feedback:
                        </h4>
                        <p className="text-blue-600 text-sm">
                          {results.feedback[index]}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => router.push("/ai-coach")}
              className="bg-claret-500 hover:bg-claret-600 text-white px-6 py-3 rounded-lg montserrat-semibold"
            >
              Start New Interview
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg montserrat-semibold"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-gradient-background p-6 flex items-center justify-center">
        <div className="text-center max-w-md bg-white p-8 rounded-lg shadow-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl montserrat-bold text-onyx-700 mb-4">
            Session Error
          </h1>
          <p className="text-onyx-600 mb-6">
            We couldn't find your interview session. The session ID might be
            invalid or expired.
          </p>
          <button
            onClick={() => router.push("/ai-coach")}
            className="bg-claret-500 hover:bg-claret-600 text-white px-6 py-2 rounded-lg montserrat-semibold transition-colors"
          >
            Return to AI Coach
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="card mb-6">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl montserrat-bold text-onyx-700">
                  AI Interview Session
                </h1>
                <p className="text-onyx-600">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-onyx-500" />
                <span className="text-onyx-600 montserrat-medium">
                  In Progress
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-alabaster-200 rounded-full h-2">
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
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Video Section */}
          <div className="card">
            <div className="card-content">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg montserrat-semibold text-onyx-500">
                  Video Preview
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={toggleVideo}
                    className={`p-2 rounded-lg transition-colors ${
                      isVideoEnabled
                        ? "bg-tea-green-100 text-tea-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {isVideoEnabled ? (
                      <Video className="w-5 h-5" />
                    ) : (
                      <VideoOff className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                {hasVideoPermission ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-white">
                      <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Camera not available</p>
                    </div>
                  </div>
                )}

                {/* Recording indicator */}
                {isRecording && (
                  <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-500 text-white px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-sm">Recording</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Question and Controls */}
          <div className="space-y-6">
            {/* Current Question */}
            <div className="card">
              <div className="card-content">
                <h2 className="text-lg montserrat-semibold text-onyx-500 mb-4">
                  Current Question
                </h2>
                {currentQuestion && (
                  <div className="bg-claret-50 border border-claret-200 rounded-lg p-4">
                    <p className="text-onyx-700 montserrat-medium text-lg">
                      {currentQuestion}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Recording Controls */}
            <div className="card">
              <div className="card-content">
                <h3 className="text-lg montserrat-semibold text-onyx-500 mb-4">
                  Your Response
                </h3>

                {/* Live Transcript */}
                <div className="bg-alabaster-50 border rounded-lg p-4 min-h-[120px] mb-4">
                  <h4 className="text-sm montserrat-semibold text-onyx-600 mb-2">
                    Live Transcript:
                  </h4>
                  <p className="text-onyx-700">
                    {transcript ||
                      (listening
                        ? "Listening..."
                        : 'Click "Start Recording" to begin speaking')}
                  </p>
                </div>

                {/* Controls */}
                <div className="flex space-x-4">
                  {!isRecording ? (
                    <button
                      onClick={startRecording}
                      disabled={!hasAudioPermission}
                      className="flex-1 bg-claret-500 hover:bg-claret-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg montserrat-semibold transition-colors flex items-center justify-center space-x-2"
                    >
                      <Mic className="w-5 h-5" />
                      <span>Start Recording</span>
                    </button>
                  ) : (
                    <button
                      onClick={stopRecording}
                      disabled={isSubmitting}
                      className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg montserrat-semibold transition-colors flex items-center justify-center space-x-2"
                    >
                      <Square className="w-5 h-5" />
                      <span>
                        {isSubmitting ? "Submitting..." : "Stop & Submit"}
                      </span>
                    </button>
                  )}
                </div>

                <div className="mt-4 flex items-center space-x-2 text-sm text-onyx-600">
                  <Mic
                    className={`w-4 h-4 ${
                      hasAudioPermission ? "text-tea-green-500" : "text-red-500"
                    }`}
                  />
                  <span>
                    Microphone: {hasAudioPermission ? "Ready" : "Not Available"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewSessionPage;
