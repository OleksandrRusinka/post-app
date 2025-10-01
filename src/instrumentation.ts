export async function register() {
  if (process.env.NEXT_RUNTIME === 'browser') {
    await import('../sentry.client.config')
  }

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('../sentry.server.config')
  }
}
