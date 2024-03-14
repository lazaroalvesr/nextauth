import { NextRequest, NextResponse } from "next/server";
import AuthService from "./modules/services/auth-service";

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};

const publicRoutes = ["/", "/portal/sign-up", "/portal/sign-in"];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const session = await AuthService.isSessionValid();

  if (!session) {
    const isApiRoute = pathname.startsWith("/api");

    if (isApiRoute) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    return NextResponse.redirect(new URL("/portal/sign-in", req.url));
  }

  return NextResponse.next();
}
