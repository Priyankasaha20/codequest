import { NextResponse } from "next/server";

// Mock session storage - in a real app, this would be a database
const mockSessions = {
  // This will be populated when sessions are created
};

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

export async function GET(request, { params }) {
  try {
    const { sessionId } = params;
    console.log("GET request for session:", sessionId);

    if (!sessionId) {
      console.log("No session ID provided");
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Mock session retrieval - in a real app, query from database
    // For demo purposes, we'll generate mock data based on sessionId
    // Extract potential interview type from the session ID
    let interviewType;
    if (sessionId.includes("technical")) {
      interviewType = "technical";
    } else if (sessionId.includes("behavioral")) {
      interviewType = "behavioral";
    } else if (sessionId.includes("system-design")) {
      interviewType = "system-design";
    } else {
      // Default to technical if not found
      interviewType = "technical";
    }

    console.log("Determined interview type:", interviewType);

    // Generate response data
    const responseData = {
      sessionId,
      interviewType,
      questions: interviewQuestions[interviewType],
      status: "active",
    };

    console.log("Returning session data:", responseData);

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching session:", error);
    return NextResponse.json(
      { error: "Failed to fetch session" },
      { status: 500 }
    );
  }
}
