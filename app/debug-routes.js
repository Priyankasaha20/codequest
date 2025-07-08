"use client";

import React from "react";
import Link from "next/link";

export default function DebugRoutes() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Routes</h1>
      <ul className="space-y-4">
        <li>
          <Link href="/ai-coach" className="text-blue-500 hover:underline">
            /ai-coach (hyphen)
          </Link>
        </li>
        <li>
          <Link href="/ai-coach" className="text-blue-500 hover:underline">
            /ai-coach (consolidated path)
          </Link>
        </li>
        <li>
          <Link
            href="/ai-coach/interview/test-session-123"
            className="text-blue-500 hover:underline"
          >
            /ai-coach/interview/test-session-123 (test route)
          </Link>
        </li>
      </ul>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">
          Current Next.js route structure:
        </h2>
        <pre className="bg-gray-100 p-4 rounded">
          {`
app/
  ai-coach/ (consolidated path)
    page.jsx
    interview/
      [sessionId]/
        page.jsx
          `}
        </pre>
      </div>
    </div>
  );
}
