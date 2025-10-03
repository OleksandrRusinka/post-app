import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_SENTRY_ENV || process.env.NODE_ENV,

  integrations: [Sentry.replayIntegration()],

  tracesSampleRate: 1.0,

  beforeSend(event) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Sentry event being sent:', event)
    }
    return event
  },

  enableLogs: true,

  replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  replaysOnErrorSampleRate: 1.0,

  debug: process.env.NODE_ENV === 'development',
})

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
