import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_SENTRY_ENV || process.env.NODE_ENV,
  debug: false,
  enableLogs: false,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  integrations: [],

  beforeSend(event) {
    return event
  },
})
