import * as Sentry from '@sentry/nextjs'

import { envServer } from '@/config/env/env.server'

Sentry.init({
  dsn: envServer.SENTRY_DSN,
  environment: envServer.SENTRY_ENV || envServer.NODE_ENV,
  debug: false,
  enableLogs: false,
  tracesSampleRate: envServer.NODE_ENV === 'production' ? 0.1 : 1.0,

  integrations: [],

  beforeSend(event) {
    return event
  },
})
