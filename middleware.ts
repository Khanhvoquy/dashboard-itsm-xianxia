// === middleware.ts ===
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/request';
export default createMiddleware(routing);
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next|.*\\..*).*)',
  ],
};
