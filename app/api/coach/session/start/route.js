import { NextResponse } from "next/server";

// Mock data for different interview types
const interviewQuestions = {
  technical: [
    "Explain the difference between let, const, and var in JavaScript.",
    "What is the time complexity of binary search and how would you implement it?",
    "Describe how you would optimize a slow database query.",
    "What are the benefits of using a microservices architecture?",
    "How would you handle state management in a large React application?",
  ],
  behavioral: [
    "Tell me about a time when you had to work under pressure.",
    "Describe a situation where you had to resolve a conflict with a team member.",
    "Give me an example of a project you're particularly proud of.",
    "How do you stay updated with new technologies and industry trends?",
    "Tell me about a time when you made a mistake and how you handled it.",
  ],
  "system-design": [
    "Design a URL shortening service like bit.ly.",
    "How would you design a chat application for millions of users?",
    "Design a notification system for a social media platform.",
    "How would you design a distributed cache system?",
    "Design a video streaming service like YouTube.",
  ],
};

export async function POST(request) {
  try {
    console.log("POST request received at /api/coach/session/start");
    const body = await request.json();
    const { interviewTypeId } = body;

    console.log("Interview type:", interviewTypeId);

    if (!interviewTypeId || !interviewQuestions[interviewTypeId]) {
      console.error("Invalid interview type:", interviewTypeId);
      return NextResponse.json(
        { error: "Invalid interview type" },
        { status: 400 }
      );
    }

    // Generate a mock session ID that includes the interview type for debugging
    const sessionId = `${interviewTypeId}_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    console.log("Generated session ID:", sessionId);

    // In a real app, you would save this to a database
    const sessionData = {
      sessionId,
      interviewType: interviewTypeId,
      questions: interviewQuestions[interviewTypeId],
      createdAt: new Date().toISOString(),
      answers: [],
      status: "active",
    };

    // Mock saving to database
    console.log("Created session:", sessionData);

    const response = {
      sessionId,
      message: "Interview session started successfully",
    };

    console.log("Returning response:", response);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error starting interview session:", error);
    return NextResponse.json(
      { error: "Failed to start interview session" },
      { status: 500 }
    );
  }
}
