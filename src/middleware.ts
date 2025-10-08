import createMiddleware from 'next-intl/middleware'

import { routing } from './pkg/libraries/locale'

export default createMiddleware(routing)

// config
export const config = {
  matcher: ['/((?!api|_next|_next/static|_next/image|.*\\.ico$|.*\\.svg$|.*\\.png$|.*\\.txt$|.*\\.js$|.*\\.css$).*)'],
}
