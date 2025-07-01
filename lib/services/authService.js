const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function loginService({ email, password }) {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: response.ok ? data : null,
      error: response.ok ? null : data.error || data.message || "Login failed",
      status: response.status,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      data: null,
      error: "Network error. Please try again.",
      status: 500,
    };
  }
}

export async function registerService({ name, email, password }) {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: response.ok ? data : null,
      error: response.ok
        ? null
        : data.error || data.message || "Registration failed",
      status: response.status,
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      data: null,
      error: "Network error. Please try again.",
      status: 500,
    };
  }
}

export async function meService() {
  try {
    // Retrieve session cookie
    const cookies = document.cookie.split(";").map((c) => c.trim());
    const sessionCookie = cookies.find((c) => c.startsWith("connect.sid="));
    const cookieHeader = sessionCookie ? sessionCookie : "";
    const response = await fetch(`${API_URL}/api/auth/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: cookieHeader,
      },
    });
    const data = await response.json();
    return {
      success: response.ok,
      data: response.ok ? data : null,
      error: response.ok
        ? null
        : data.error || data.message || "Fetch user failed",
      status: response.status,
    };
  } catch (error) {
    console.error("Fetch user error:", error);
    return {
      success: false,
      data: null,
      error: "Network error. Please try again.",
      status: 500,
    };
  }
}
