'use client'

import mixpanel from 'mixpanel-browser'

export const mixpanelUtils = {
  trackPostViewed: (postData: { post_id: string | number; title: string }) => {
    if (typeof window !== 'undefined' && mixpanel && mixpanel.track) {
      mixpanel.track('PostViewed', {
        post_id: postData.post_id,
        title: postData.title,
        timestamp: new Date().toISOString(),
        source: 'post_card',
      })
    }
  },
}
