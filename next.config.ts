import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

import { withSentryConfig } from '@sentry/nextjs'

// i18n
const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/pkg/libraries/locale/request.ts',
})

// next config
const nextConfig: NextConfig = {
  output: 'standalone',

  poweredByHeader: false,
  cacheMaxMemorySize: 100 * 1024 * 1024,

  experimental: {
    reactCompiler: true,
    optimizeServerReact: true,

    optimizePackageImports: [
      'zod',
      'react-hook-form',
      'usehooks-ts',
      '@heroui/react',
      'zustand',
      'framer-motion',
      'lucide-react',
    ],
    staticGenerationRetryCount: 1,
    staticGenerationMaxConcurrency: 2,
    staticGenerationMinPagesPerWorker: 25,
  },
}

export default withSentryConfig(withNextIntl(nextConfig), {
  org: process.env.SENTRY_ORG || 'myself-2jp',
  project: process.env.SENTRY_PROJECT || 'javascript-nextjs',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: '/monitoring',
  sourcemaps: {
    disable: false,
  },
  disableLogger: true,
  automaticVercelMonitors: true,
})
