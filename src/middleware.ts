import createMiddleware from 'next-intl/middleware'

import { routing } from './pkg/libraries/locale'

export default createMiddleware(routing)

export const config = {
  matcher: ['/', '/(uk|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
}
