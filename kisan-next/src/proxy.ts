import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const isPublicRoute = createRouteMatcher([
  '/',
  '/:locale',
  '/:locale/auth(.*)',
  '/api/webhooks(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;

  // Always pass API routes through
  if (pathname.startsWith('/api')) {
    return;
  }

  // Apply intl middleware for all page routes
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    // Match all paths except Next.js internals and static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
