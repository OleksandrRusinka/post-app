'use client'

import { usePathname } from 'next/navigation'
import { type FC, type ReactNode, useEffect } from 'react'

import { initMixpanel, trackPageView } from './mixpanelClient'

interface IProps {
  children: ReactNode
}

const MixpanelProvider: FC<Readonly<IProps>> = (props) => {
  const { children } = props
  const pathname = usePathname()

  useEffect(() => {
    initMixpanel()
  }, [])

  useEffect(() => {
    if (pathname) {
      trackPageView(pathname)
    }
  }, [pathname])

  return <>{children}</>
}

export default MixpanelProvider
