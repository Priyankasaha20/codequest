"use client";

import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function Dictaphone() {
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
    interimTranscript,
  } = useSpeechRecognition();

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-IN",
      interimResults: true,
    });
  };

  // Debug browser support
  console.log("SpeechRecognition supported?", browserSupportsSpeechRecognition);
  if (!browserSupportsSpeechRecognition) {
    return (
      <span>
        Browser doesn't support speech recognition. Please use Chrome or Edge.
      </span>
    );
  }

  return (
    <main>
      <h1>Speech Recognition Demo</h1>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={startListening}>Start</button>
      <button onClick={() => SpeechRecognition.stopListening()}>Stop</button>
      <h1>{transcript}</h1>
      <p>Interim Transcript: {interimTranscript}</p>
    </main>
  );
}
