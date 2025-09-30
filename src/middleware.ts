import createMiddleware from 'next-intl/middleware'

import { routing } from './pkg/libraries/locale'

export default createMiddleware(routing)

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(uk|en|de)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
}
