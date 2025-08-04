import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;
  const baseUrl = request.nextUrl.origin;

  const authRoutes = ["/signin", "/signup"];
  const protectedRoutes = ["/expensetracker", "/todolist"];

  if (token) {
    if (authRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/", baseUrl));
    }
  } else {
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/signin", baseUrl));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/signup", "/expensetracker/:path*", "/todolist/:path*"],
};
