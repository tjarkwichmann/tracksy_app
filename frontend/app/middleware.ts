import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

const protectedRoutes = ["/dashboard", "/profile", "/workouts"];
const publicRoutes = ["/login", "/signup", "/"];

export default withAuth(
    function middleware(req: NextRequest & { nextauth: { token: any } }) {
        const path = req.nextUrl.pathname;
        const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
        const isPublicRoute = publicRoutes.includes(path);
        const token = req.nextauth.token;

        if (isProtectedRoute && !token) {
            return NextResponse.redirect(new URL("/login", req.nextUrl));
        }

        if (isPublicRoute && token && !path.startsWith("/login")) {
            return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const path = req.nextUrl.pathname;
                const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));

                if (isProtectedRoute) {
                    return !!token;
                }

                return true;
            },
        },
    }
);

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)"],
};
