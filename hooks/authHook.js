import { useState, useCallback, useEffect } from "react";

/**
 * useAuth hook to fetch and manage authenticated user data.
 * Calls /auth/me endpoint with credentials include to send session cookies.
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/auth/me", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch user");
      }
      setUser(data);
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loading, error, fetchUser };
}
