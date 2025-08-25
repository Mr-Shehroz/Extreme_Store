import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths that anyone can access
  const isPublicPath = path === "/" || path === "/login" || path === "/signup";

  // Check if user has a token
  const token = request.cookies.get("token")?.value;

  // 👉 If user is on login/signup but is already logged in → redirect to /my-account
  if (token && (path === "/login" || path === "/signup")) {
    return NextResponse.redirect(new URL("/my-account", request.url));
  }

  // 👉 If user is NOT logged in and tries to access a protected path → redirect to home
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",           // needed to redirect logged-in users from /login or /signup
    "/login",
    "/signup",
    "/shop",
    "/about",
    "/contact",
    "/my-account",
    // Add other protected or public routes as needed
  ],
};