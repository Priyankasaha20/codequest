"use server";

export async function registerAction(formData) {
  try {
    const { name, email, password } = formData;

    // Basic validation
    if (!name || !email || !password) {
      return {
        success: false,
        error: "Name, email and password are required",
        status: 400,
      };
    }

    // Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Please enter a valid email",
        status: 400,
      };
    }

    // Password strength check
    if (password.length < 8) {
      return {
        success: false,
        error: "Password must be at least 8 characters",
        status: 400,
      };
    }

    // Simulate API call to backend
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
      }/api/auth/register`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    );

    if (response.status === 409) {
      return {
        success: false,
        error: "Email already exists",
        status: 409,
      };
    }

    if (!response.ok) {
      return {
        success: false,
        error: "Registration failed. Please try again.",
        status: response.status,
      };
    }

    const data = await response.json();

    return {
      success: true,
      data,
      status: 201,
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: "Network error. Please try again.",
      status: 500,
    };
  }
}

export async function loginAction(formData) {
  try {
    const { email, password } = formData;

    // Basic validation
    if (!email || !password) {
      return {
        success: false,
        error: "Email and password are required",
        status: 400,
      };
    }

    // Simulate API call to backend
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
      }/api/auth/login`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (response.status === 401) {
      return {
        success: false,
        error: "Invalid credentials",
        status: 401,
      };
    }

    if (!response.ok) {
      return {
        success: false,
        error: "Login failed. Please try again.",
        status: response.status,
      };
    }

    const data = await response.json();

    return {
      success: true,
      data,
      status: 200,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: "Network error. Please try again.",
      status: 500,
    };
  }
}
