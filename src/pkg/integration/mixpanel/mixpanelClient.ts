import mixpanel from 'mixpanel-browser'

import { envClient } from '@/config/env/env.client'
import { envServer } from '@/config/env/env.server'
import { MIXPANEL_API_HOST } from '@/shared/constants/common.constants'

export const initMixpanel = () => {
  if (!envClient.NEXT_PUBLIC_MIXPANEL_TOKEN) {
    if (envServer.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn('Mixpanel token is missing! Check your .env file.')
    }
    return
  }

  if (typeof window !== 'undefined') {
    mixpanel.init(envClient.NEXT_PUBLIC_MIXPANEL_TOKEN, {
      autocapture: true,
      debug: false,
      ignore_dnt: true,
      api_host: MIXPANEL_API_HOST,
    })
  }
}

export const trackPostViewed = (postData: { post_id: string | number; title: string; variant: string }) => {
  if (typeof window !== 'undefined' && mixpanel && mixpanel.track) {
    mixpanel.track('PostViewed', {
      post_id: postData.post_id,
      title: postData.title,
      variant: postData.variant,
      timestamp: new Date().toISOString(),
      source: 'post_card',
    })
  }
}
