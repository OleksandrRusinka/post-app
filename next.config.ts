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
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

export default withSentryConfig(withNextIntl(nextConfig), {
  project: 'nextjs-post-app',
  authToken: process.env.SENTRY_AUTH_TOKEN,

  widenClientFileUpload: true,
  disableLogger: true,
})
