import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const isPublicRoute = createRouteMatcher([
  "/",
  "/(hi|gu|en)",
  "/(hi|gu|en)/auth(.*)",
  "/auth(.*)",
  "/api(.*)",
  "/:locale/auth(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) {
    return handleI18nRouting(req);
  }
  
  auth().protect();
  
  return handleI18nRouting(req);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
