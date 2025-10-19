import * as Sentry from '@sentry/nextjs'

import { envServer } from '@/config/env/env.server'

class SentryManager {
  private static initialized = false

  static init(): void {
    if (SentryManager.initialized) return

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

    SentryManager.initialized = true
  }
}

SentryManager.init()
