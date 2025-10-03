import { GrowthBook } from '@growthbook/growthbook'

const growthbook = new GrowthBook({
  apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST || 'https://cdn.growthbook.io',
  clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY || process.env.GROWTHBOOK_CLIENT_KEY,
  enableDevMode: process.env.NODE_ENV === 'development',

  trackingCallback: (experiment: any, result: any) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'experiment_viewed', {
        experiment_id: experiment.key,
        variation_id: result.variationId,
      })
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('Experiment Viewed', {
        experimentId: experiment.key,
        variationId: result.variationId,
      })
    }
  },
})

export { growthbook }
