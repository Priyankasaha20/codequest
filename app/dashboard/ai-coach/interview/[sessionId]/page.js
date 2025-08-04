"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Webcam from "react-webcam";
import {
  Video,
  VideoOff,
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
  const webcamRef = useRef(null); // Add webcam reference
  const streamRef = useRef(null);

  const [sessionId] = useState(params.sessionId);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState({
    video: "pending",
    audio: "pending",
  });
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [results, setResults] = useState(null);
  const [answers, setAnswers] = useState([]);

  // Replace the existing webcam implementation with react-webcam
  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user",
  };

  useEffect(() => {
    setIsMounted(true);
    console.log(
      "SpeechRecognition supported?",
      window.SpeechRecognition || window.webkitSpeechRecognition
    );
    console.log("Navigator userAgent:", navigator.userAgent);
    console.log("Is HTTPS?", window.location.protocol === "https:");
  }, []);


  const safelyCheckBrowserFeatures = () => {
    if (!isMounted) return true; 
    return browserSupportsSpeechRecognition;
  };


  useEffect(() => {
    const fetchSession = async () => {
      if (!sessionId) return;

      try {
        const { data } = await axios.get(`/api/coach/session/${sessionId}`);
        setSession(data);
      } catch (error) {
        console.error("Error fetching session:", error);
        setError("Failed to load interview session.");
      } finally {
        setIsLoading(false);
      }
    };

    if (isMounted) {
      fetchSession();
    }
  }, [sessionId, isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    const requestPermissions = async () => {
      try {
        console.log("Requesting media permissions...");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        streamRef.current = stream;
        setPermissionStatus({ video: "granted", audio: "granted" });
        console.log("Media permissions granted!");

      } catch (error) {
        console.error("Media permissions error:", error);

        try {
          const audioStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          streamRef.current = audioStream;
          setPermissionStatus({ video: "denied", audio: "granted" });
          console.log("Audio permission granted, but video denied");
        } catch (audioError) {
          console.error("Audio permission error:", audioError);
          setPermissionStatus({ video: "denied", audio: "denied" });
        }
      }
    };

    requestPermissions();

    return () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => track.stop());
        console.log("Media streams stopped and cleaned up");
      }
    };
  }, [isMounted]);

  if (isMounted && !safelyCheckBrowserFeatures()) {
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

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTracks = streamRef.current.getVideoTracks();
      videoTracks.forEach((track) => {
        track.enabled = !isVideoEnabled;
      });

      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const startRecording = async () => {
    console.log("Starting recording...");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      SpeechRecognition.startListening({
        continuous: true,
        language: "en-US",
        interimResults: true,
      });
      setIsRecording(true);
      console.log("Speech recognition started successfully");
    } catch (error) {
      console.error(
        "Error accessing microphone for speech recognition:",
        error
      );
      alert(
        "Microphone access denied. Please allow microphone access and try again."
      );
    }
  };

  const stopRecording = async () => {
    console.log("Stopping recording...");

    SpeechRecognition.stopListening();
    setIsRecording(false);
    if (!transcript || transcript.trim() === "") {
      alert("No speech was detected. Please try speaking again.");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Submitting answer:", transcript);

      await axios.post(`/api/coach/session/${sessionId}/answer`, {
        questionIndex: currentQuestionIndex,
        text: transcript,
      });

      const newAnswer = {
        questionIndex: currentQuestionIndex,
        question: session?.questions?.[currentQuestionIndex] || "",
        answer: transcript,
      };
      setAnswers((prev) => [...prev, newAnswer]);

      if (
        session?.questions &&
        currentQuestionIndex < session.questions.length - 1
      ) {
        setCurrentQuestionIndex((prev) => prev + 1);
        resetTranscript();
      } else {
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

  if (error && permissionStatus.audio === "denied") {
    return (
      <div className="min-h-screen bg-gradient-background p-6 flex items-center justify-center">
        <div className="text-center max-w-md bg-white p-8 rounded-lg shadow-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl montserrat-bold text-onyx-700 mb-2">
            Permissions Required
          </h2>
          <p className="text-onyx-600 mb-4">{error}</p>
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

  const currentQuestion = session?.questions?.[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="card mb-6">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl montserrat-bold text-onyx-700">
                  AI Interview Session
                </h1>
                <p className="text-onyx-600">
                  Question {currentQuestionIndex + 1} of{" "}
                  {session?.questions?.length || 0}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-onyx-500" />
                <span className="text-onyx-600 montserrat-medium">
                  In Progress
                </span>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-alabaster-200 rounded-full h-2">
                <div
                  className="bg-claret-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      ((currentQuestionIndex + 1) /
                        (session?.questions?.length || 1)) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
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

              <div className="relative bg-black rounded-lg overflow-hidden">
                {isVideoEnabled ? (
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    videoConstraints={videoConstraints}
                    className="w-full h-auto rounded-lg"
                  />
                ) : (
                  <div className="w-full h-64 flex items-center justify-center text-white">
                    <Camera className="w-16 h-16 opacity-30" />
                    <p className="mt-4 text-white opacity-60">
                      Camera disabled
                    </p>
                  </div>
                )}
                {isRecording && (
                  <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-500 text-white px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-sm">Recording</span>
                  </div>
                )}
                <button
                  onClick={toggleVideo}
                  className="absolute bottom-4 right-4 bg-onyx-800 bg-opacity-60 p-2 rounded-full text-white"
                >
                  {isVideoEnabled ? (
                    <Video className="w-5 h-5" />
                  ) : (
                    <VideoOff className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-6">
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
            <div className="card">
              <div className="card-content">
                <h3 className="text-lg montserrat-semibold text-onyx-500 mb-4">
                  Your Response
                </h3>
                <p className="text-onyx-700">Response recording is disabled.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewSessionPage;
