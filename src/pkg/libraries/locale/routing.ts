import { defineRouting } from 'next-intl/routing'

// routing
export const routing = defineRouting({
  locales: ['en', 'uk', 'de'],
  localePrefix: 'as-needed',
  localeDetection: true,
  defaultLocale: 'en',
})
