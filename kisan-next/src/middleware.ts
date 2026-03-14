import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const isProtectedRoute = createRouteMatcher([
  '/(.*)/dashboard(.*)',
  '/(.*)/fertilizer-calculator(.*)',
  '/(.*)/tools(.*)'
]);

export default function middleware(req: any) {
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    '/',
    '/(hi|en|gu)/:path*',
    // Exclude /api, _next, _vercel, static files so API routes work
    '/((?!api|_next|_vercel|manifest.json|favicon.ico|.*\\..*).*)'
  ]
};
