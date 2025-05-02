import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;
  const baseUrl = request.nextUrl.origin;

  // Define route types
  const authRoutes = ["/signin", "/signup"];
  const protectedRoutes = ["/expensetracker", "/todolist"];

  // If user is authenticated
  if (token) {
    // Redirect away from auth routes if logged in
    if (authRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/", baseUrl));
    }

    // Allow access to protected routes
    if (protectedRoutes.includes(pathname)) {
      return NextResponse.next();
    }
  }
  // If user is not authenticated and trying to access protected route
  else if (protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/signin", baseUrl));
  }

  // Default behavior for unmatched routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/expensetracker", "/todolist"],
};
