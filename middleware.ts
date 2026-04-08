import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { routing } from '@/i18n/request';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Handle root path redirect to /vi
  if (request.nextUrl.pathname === '/') {
    return Response.redirect(new URL('/vi', request.url));
  }
  
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next|.*\\..*).*)',
  ],
};
