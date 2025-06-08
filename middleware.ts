import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

const ProtectedRoutes = ["/reservation", "/checkout", "/admin"];

export const middleware = async (request: NextRequest) => {
  try {
    const session = await auth();
    const isLoggedIn = !!session?.user;
    const role = session?.user.role;
    const { pathname } = request.nextUrl;

    // Logging untuk debugging
    console.log(`[Middleware] Path: ${pathname}, IsLoggedIn: ${isLoggedIn}, Role: ${role}`);

    if (
      !isLoggedIn &&
      ProtectedRoutes.some((route) => pathname.startsWith(route))
    ) {
      const redirectUrl = new URL("/signin", request.url);
      redirectUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    if (isLoggedIn && role !== "admin" && pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (isLoggedIn && pathname.startsWith("/signin")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("[Middleware] Error:", error);
    // Redirect ke halaman error jika terjadi masalah
    return NextResponse.redirect(new URL("/error", request.url));
  }
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
