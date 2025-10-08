import mixpanel from 'mixpanel-browser'

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN

export const initMixpanel = () => {
  if (!MIXPANEL_TOKEN) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn('Mixpanel token is missing! Check your .env file.')
    }
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

export const trackPostViewed = (postData: { post_id: string | number; title: string }) => {
  if (typeof window !== 'undefined' && mixpanel && mixpanel.track) {
    mixpanel.track('PostViewed', {
      post_id: postData.post_id,
      title: postData.title,
      timestamp: new Date().toISOString(),
      source: 'post_card',
    })
  }
}
