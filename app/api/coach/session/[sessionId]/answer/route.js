import { NextResponse } from "next/server";

// Mock storage for answers - in a real app, this would be a database
const sessionAnswers = {};

export async function POST(request, { params }) {
  try {
    const { sessionId } = params;
    const { questionIndex, text } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    if (questionIndex === undefined || !text) {
      return NextResponse.json(
        { error: "Question index and answer text are required" },
        { status: 400 }
      );
    }

    // Initialize session answers if not exists
    if (!sessionAnswers[sessionId]) {
      sessionAnswers[sessionId] = [];
    }

    // Store the answer
    const answerData = {
      questionIndex,
      text: text.trim(),
      timestamp: new Date().toISOString(),
      wordCount: text.trim().split(" ").length,
    };

    sessionAnswers[sessionId][questionIndex] = answerData;

    console.log(
      `Answer stored for session ${sessionId}, question ${questionIndex}:`,
      answerData
    );

    return NextResponse.json({
      success: true,
      message: "Answer submitted successfully",
      answerData,
    });
  } catch (error) {
    console.error("Error submitting answer:", error);
    return NextResponse.json(
      { error: "Failed to submit answer" },
      { status: 500 }
    );
  }
}
