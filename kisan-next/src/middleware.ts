import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

const isPublicRoute = createRouteMatcher(['/', '/api/webhooks(.*)']);

export default clerkMiddleware((auth, req) => {
  const { pathname } = req.nextUrl;

  // 1. Let API routes pass through to handle their own auth or be public
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // 2. Handle internationalization for pages
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    '/',
    '/(hi|en|gu)/:path*',
    // Exclude /api, _next, _vercel, static files so API routes work
    '/((?!api|_next|_vercel|manifest.json|favicon.ico|.*\\..*).*)'
  ]
};
