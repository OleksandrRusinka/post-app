import mixpanel from 'mixpanel-browser'

import { envClient } from '@/config/env/env.client'
import { envServer } from '@/config/env/env.server'
import { MIXPANEL_API_HOST } from '@/shared/constants/common.constants'

class MixpanelManager {
  private static initialized = false

  static init(): void {
    if (MixpanelManager.initialized || typeof window === 'undefined') return

    if (!envClient.NEXT_PUBLIC_MIXPANEL_TOKEN) {
      if (envServer.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn('Mixpanel token is missing!')
      }
      return
    }

    mixpanel.init(envClient.NEXT_PUBLIC_MIXPANEL_TOKEN, {
      autocapture: true,
      debug: false,
      ignore_dnt: true,
      api_host: MIXPANEL_API_HOST,
    })
    MixpanelManager.initialized = true
  }

  static track(event: string, data?: Record<string, unknown>): void {
    if (typeof window !== 'undefined' && mixpanel?.track) {
      mixpanel.track(event, { ...data, timestamp: new Date().toISOString() })
    }
  }
}

export const initMixpanel = () => MixpanelManager.init()

export const trackPostViewed = (postData: { post_id: string | number; title: string; variant: string }) => {
  MixpanelManager.track('PostViewed', {
    post_id: postData.post_id,
    title: postData.title,
    variant: postData.variant,
    source: 'post_card',
  })
}
