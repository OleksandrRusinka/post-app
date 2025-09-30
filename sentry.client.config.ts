import * as Sentry from '@sentry/nextjs'

import { envClient } from '@/config/env'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  environment: envClient.NEXT_PUBLIC_SENTRY_ENV || 'development',

  sendDefaultPii: true,

  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),

    Sentry.feedbackIntegration({
      colorScheme: 'system',
      showBranding: false,
    }),
  ],

  enableLogs: true,

  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  beforeSend(event, hint) {
    if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_SENTRY_DSN) {
      return null
    }
    return event
  },

  ignoreErrors: [
    'top.GLOBALS',
    'chrome-extension://',
    'moz-extension://',
    "Can't find variable: ZiteReader",
    'jigsaw is not defined',
    'ComboSearch is not defined',
    'NetworkError',
    'Network request failed',
    'AbortError',
  ],
})

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
