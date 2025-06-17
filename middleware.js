import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Define protected routes
  const protectedRoutes = ["/dashboard", "/daily-challenge", "/practice-hub"];

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // For now, we'll rely on client-side authentication
  // In a real app, you'd check for auth tokens/cookies here
  if (isProtectedRoute) {
    // You can add server-side auth logic here if needed
    // For this demo, we'll handle auth on the client side
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
