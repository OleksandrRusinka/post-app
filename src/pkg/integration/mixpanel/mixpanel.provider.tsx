'use client'

import { type FC, type ReactNode, useEffect } from 'react'

import { initMixpanel } from './mixpanelClient'

interface IProps {
  children: ReactNode
}

const MixpanelProvider: FC<Readonly<IProps>> = (props) => {
  const { children } = props

  useEffect(() => {
    initMixpanel()
  }, [])

  return <>{children}</>
}

export default MixpanelProvider
