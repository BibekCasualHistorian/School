// it is not the part of next auth
// it is part of nextjs

import NextAuth from "next-auth";
import authConfig from "../auth.config";
import {
  publicRoutes,
  // DEFAULT_LOGIN_REDIRECT,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "../routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // console.log("Route", req.nextUrl.pathname);

  // console.log("ROUTE", req.nextUrl);

  const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

  const isInStudentRoute = nextUrl.pathname.includes("student");
  const isInTeacherRoute = nextUrl.pathname.includes("teacher");
  const isInAdminRoute = nextUrl.pathname.includes("admin");

  console.log(isInAdminRoute, isInStudentRoute, isInTeacherRoute);

  // console.log("isApiAuthRoutes", isApiAuthRoutes);
  // console.log("isPublicRoutes", isPublicRoutes);
  // console.log("isAuthRoutes", isAuthRoutes);

  if (isApiAuthRoutes) {
    // console.log("isAuthRoutes", isAuthRoutes);
    return;
  }

  if (isAuthRoutes) {
    if (isLoggedIn) {
      // console.log("isLoggedIn", isAuthRoutes);
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    } else {
      return;
    }
  }

  if (!isLoggedIn && !isPublicRoutes) {
    // console.log("it is in PublicRoutes", isPublicRoutes);
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return;

  // req.auth
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  // it is just used to invoke a middleware
  // it isn't used for anything else
  // matcher: ["/auth/login", "/auth/register", "/"],
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
