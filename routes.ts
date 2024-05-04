export const publicRoutes = ["/", "/auth/new-verification"];

// the array of routes which will be used for authetication
// it is redirect to settings if user is logged in
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/reset",
  "/auth/error",
  "/auth/new-password",
];

export const adminRoute = "admin";
export const studentRoute = "student";
export const teacherRoute = "teacher";

// the prefix for API authentication routes
// used of API authentication process
// should always be available
export const apiAuthPrefix = "/api/auth";

// the default redirect path after loggin
export const DEFAULT_LOGIN_REDIRECT = "/admin/profile";
