import { NextResponse } from "next/server";

// Mock storage - in a real app, this would be a database
const sessionAnswers = {};

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

// Mock AI feedback generation
function generateMockFeedback(question, answer, interviewType) {
  const feedbackTemplates = {
    technical: [
      "Good understanding of the concept. Consider adding more specific examples.",
      "Solid technical knowledge demonstrated. Could improve on implementation details.",
      "Clear explanation. Try to discuss edge cases and optimization opportunities.",
      "Well-structured answer. Consider mentioning real-world applications.",
      "Good approach. Could benefit from discussing scalability considerations.",
    ],
    behavioral: [
      "Great use of the STAR method. Very clear and structured response.",
      "Good example provided. Could elaborate more on the outcome and lessons learned.",
      "Nice specific example. Consider highlighting your role more prominently.",
      "Well-articulated response. Could strengthen the impact section.",
      "Good storytelling. Try to connect it more directly to the job requirements.",
    ],
    "system-design": [
      "Good high-level design. Consider discussing data consistency and availability.",
      "Solid architecture approach. Could benefit from more detailed component breakdown.",
      "Nice scalability considerations. Add more detail about database design.",
      "Good system overview. Consider discussing monitoring and reliability aspects.",
      "Well-thought design. Could improve on discussing trade-offs and alternatives.",
    ],
  };

  const templates =
    feedbackTemplates[interviewType] || feedbackTemplates.technical;
  return templates[Math.floor(Math.random() * templates.length)];
}

// Mock scoring function
function generateMockScore(answer, interviewType) {
  const wordCount = answer.split(" ").length;
  let baseScore = Math.min(10, Math.max(4, wordCount / 20)); // Base score on answer length

  // Add some randomness and type-specific adjustments
  const randomAdjustment = (Math.random() - 0.5) * 2; // -1 to +1
  const typeBonus = {
    technical: 0.2,
    behavioral: 0.1,
    "system-design": 0.3,
  };

  const finalScore = Math.min(
    10,
    Math.max(1, baseScore + randomAdjustment + (typeBonus[interviewType] || 0))
  );
  return Math.round(finalScore * 10) / 10; // Round to 1 decimal place
}

export async function POST(request, { params }) {
  try {
    const { sessionId } = params;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Get session answers (in real app, fetch from database)
    const answers = sessionAnswers[sessionId] || [];

    // Determine interview type from sessionId or stored data
    const interviewType = sessionId.includes("technical")
      ? "technical"
      : sessionId.includes("behavioral")
      ? "behavioral"
      : sessionId.includes("system")
      ? "system-design"
      : "technical";

    const questions =
      interviewQuestions[interviewType] || interviewQuestions.technical;

    // Generate mock feedback and scores
    const feedback = [];
    const answerTexts = [];
    const individualScores = [];

    for (let i = 0; i < questions.length; i++) {
      const answer = answers[i];
      if (answer) {
        answerTexts.push(answer.text);
        feedback.push(
          generateMockFeedback(questions[i], answer.text, interviewType)
        );
        individualScores.push(generateMockScore(answer.text, interviewType));
      } else {
        answerTexts.push("No answer provided");
        feedback.push("Question was not answered.");
        individualScores.push(0);
      }
    }

    // Calculate overall scores
    const avgScore =
      individualScores.reduce((sum, score) => sum + score, 0) /
      individualScores.length;
    const technicalScore = Math.min(10, avgScore + (Math.random() - 0.5));
    const communicationScore = Math.min(
      10,
      avgScore + (Math.random() - 0.5) * 2
    );

    const scores = {
      overall: Math.round(avgScore * 10) / 10,
      technical: Math.round(technicalScore * 10) / 10,
      communication: Math.round(communicationScore * 10) / 10,
      individual: individualScores,
    };

    // Generate summary
    const summary = `You completed a ${interviewType.replace(
      "-",
      " "
    )} interview with an overall score of ${scores.overall}/10. ${
      scores.overall >= 8
        ? "Excellent performance! You demonstrated strong knowledge and communication skills."
        : scores.overall >= 6
        ? "Good performance with room for improvement. Focus on providing more detailed examples."
        : "There's significant room for improvement. Consider practicing more and preparing specific examples."
    } Your strongest area was ${
      scores.technical > scores.communication
        ? "technical knowledge"
        : "communication skills"
    }.`;

    const results = {
      sessionId,
      questions,
      answers: answerTexts,
      feedback,
      scores,
      summary,
      completedAt: new Date().toISOString(),
      interviewType,
    };

    // In a real app, save these results to database
    console.log("Interview completed:", results);

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error completing interview:", error);
    return NextResponse.json(
      { error: "Failed to complete interview" },
      { status: 500 }
    );
  }
}
