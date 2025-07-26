const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * Quiz Service - Handles all quiz-related API calls
 */
class QuizService {
  /**
   * Start a new quiz session
   * @param {string} subject - The quiz subject/topic (DBMS, OOPS, OS, Networking)
   * @param {number} count - Number of questions (default: 10, max: 50)
   * @returns {Promise<Object>} Quiz session data
   */
  async startQuiz(subject, count = 10) {
    try {
      const requestBody = {
        count: Math.min(count, 50), // Ensure max 50 questions
      };

      // Only include topic if provided (backend allows random if not provided)
      if (subject) {
        requestBody.topic = subject;
      }

      const response = await fetch(`${API_BASE_URL}/api/quiz/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for authentication
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Quiz start error:", errorData);

        // If unauthorized, provide helpful error message
        if (response.status === 401) {
          throw new Error(
            "Authentication required. Please log in to start a quiz."
          );
        }

        throw new Error(
          errorData.message ||
            errorData.error ||
            `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message || "Failed to start quiz session");
    }
  }

  /**
   * Get current question for a quiz session
   * @param {string} sessionId - The quiz session ID
   * @returns {Promise<Object>} Current question data
   */
  async getQuestion(sessionId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/quiz/${sessionId}/question`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          credentials: "include", // Include cookies for authentication
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        // If unauthorized, provide helpful error message
        if (response.status === 401) {
          throw new Error(
            "Authentication required. Please log in to access quiz questions."
          );
        }

        // If session not found, provide helpful error message
        if (response.status === 404) {
          throw new Error(
            "Quiz session not found or expired. Please start a new quiz."
          );
        }

        throw new Error(
          errorData.message ||
            errorData.error ||
            `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message || "Failed to load question");
    }
  }

  /**
   * Submit an answer for the current question
   * @param {string} sessionId - The quiz session ID
   * @param {number|null} answerIndex - Index of selected answer (0=A, 1=B, 2=C, 3=D, null for timeout)
   * @returns {Promise<Object>} Answer submission result
   */
  async submitAnswer(sessionId, answerIndex) {
    try {
      // Convert answer index to letter format expected by backend
      let answerLetter = null;
      if (answerIndex !== null && answerIndex !== undefined) {
        const answerMap = { 0: "A", 1: "B", 2: "C", 3: "D" };
        answerLetter = answerMap[answerIndex];

        if (!answerLetter) {
          throw new Error("Invalid answer index. Must be 0, 1, 2, or 3.");
        }
      }

      const response = await fetch(
        `${API_BASE_URL}/api/quiz/${sessionId}/answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies for authentication
          body: JSON.stringify({
            answer: answerLetter,
          }),
        }
      );

      console.log("Submit answer response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Submit answer error:", errorData);

        // If unauthorized, provide helpful error message
        if (response.status === 401) {
          throw new Error(
            "Authentication required. Please log in to submit answers."
          );
        }

        // If session not found, provide helpful error message
        if (response.status === 404) {
          throw new Error(
            "Quiz session not found or expired. Please start a new quiz."
          );
        }

        throw new Error(
          errorData.message ||
            errorData.error ||
            `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message || "Failed to submit answer");
    }
  }

  /**
   * Check if quiz is completed by trying to get next question
   * The backend handles completion logic in the submitAnswer response
   * @param {string} sessionId - The quiz session ID
   * @returns {Promise<Object>} Quiz status or completion result
   */
  async checkQuizStatus(sessionId) {
    try {
      const response = await this.getQuestion(sessionId);
      return response;
    } catch (error) {
      // If getting question fails, quiz might be completed or there's an error

      // If it's a 400 error, quiz might be completed
      if (
        error.message.includes("400") ||
        error.message.includes("completed")
      ) {
        return {
          completed: true,
          sessionId: sessionId,
          message: "Quiz completed",
        };
      }

      throw error;
    }
  }

  /**
   * Complete the quiz (for backward compatibility)
   * Note: Your backend handles completion automatically in submitAnswer
   * This method exists for frontend compatibility
   * @param {string} sessionId - The quiz session ID
   * @returns {Promise<Object>} Quiz completion result
   */
  async completeQuiz(sessionId) {
    try {
      // Try to get the current quiz status
      return await this.checkQuizStatus(sessionId);
    } catch (error) {
      // Return a basic completion structure as fallback
      return {
        completed: true,
        sessionId: sessionId,
        message: "Quiz completed",
      };
    }
  }

  /**
   * Check if user is authenticated before making API calls
   * @returns {Promise<boolean>} Whether user is authenticated
   */
  async checkAuthentication() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        method: "GET",
        credentials: "include",
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get available quiz topics
   * @returns {Array} List of available quiz topics
   */
  getAvailableTopics() {
    return ["DBMS", "OOPS", "OS", "Networking"];
  }

  /**
   * Validate topic name
   * @param {string} topic - Topic to validate
   * @returns {boolean} Whether topic is valid
   */
  isValidTopic(topic) {
    return this.getAvailableTopics().includes(topic);
  }

  /**
   * Validate question count
   * @param {number} count - Number of questions
   * @returns {boolean} Whether count is valid
   */
  isValidQuestionCount(count) {
    const num = parseInt(count, 10);
    return !isNaN(num) && num >= 1 && num <= 50;
  }

  /**
   * Convert answer index to letter format
   * @param {number} index - Answer index (0-3)
   * @returns {string} Answer letter (A-D)
   */
  indexToLetter(index) {
    const answerMap = { 0: "A", 1: "B", 2: "C", 3: "D" };
    return answerMap[index] || null;
  }

  /**
   * Convert answer letter to index
   * @param {string} letter - Answer letter (A-D)
   * @returns {number} Answer index (0-3)
   */
  letterToIndex(letter) {
    const letterMap = { A: 0, B: 1, C: 2, D: 3 };
    return letterMap[letter?.toUpperCase()] ?? null;
  }

  /**
   * Calculate score percentage
   * @param {number} correctAnswers - Number of correct answers
   * @param {number} totalQuestions - Total number of questions
   * @returns {number} Score percentage
   */
  calculateScorePercentage(correctAnswers, totalQuestions) {
    if (totalQuestions === 0) return 0;
    return Math.round((correctAnswers / totalQuestions) * 100);
  }

  /**
   * Format time duration in seconds to readable format
   * @param {number} seconds - Duration in seconds
   * @returns {string} Formatted time string
   */
  formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }
}

// Create and export a singleton instance
const quizService = new QuizService();
export default quizService;
