'use client'

import mixpanel from 'mixpanel-browser'
import { type FC, type ReactNode, useEffect } from 'react'

interface IProps {
  children: ReactNode
}
const MixpanelProvider: FC<Readonly<IProps>> = (props) => {
  const { children } = props

  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) {
      mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, {
        autocapture: true,
        debug: false,
        record_sessions_percent: 0,
      })
    }
  }, [])

  return <>{children}</>
}

export default MixpanelProvider
