import mixpanel from 'mixpanel-browser'

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN

export const initMixpanel = () => {
  if (!MIXPANEL_TOKEN) {
    console.warn('Mixpanel token is missing! Check your .env file.')
    return
  }

  if (typeof window !== 'undefined') {
    mixpanel.init(MIXPANEL_TOKEN, {
      autocapture: true,
      debug: false,
      ignore_dnt: true,
      api_host: 'https://api-eu.mixpanel.com',
    })
  }
}

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && mixpanel.track) {
    mixpanel.track('Page View', {
      url: url,
      timestamp: new Date().toISOString(),
    })
  }
}
