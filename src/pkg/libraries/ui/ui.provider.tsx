'use client'

import type { FC, ReactNode } from 'react'

import { HeroUIProvider } from '@heroui/react'

// interface
interface IProps {
  children: ReactNode
}

// ui provider
const UiProvider: FC<Readonly<IProps>> = (props) => {
  const { children } = props

  // return
  return <HeroUIProvider>{children} </HeroUIProvider>
}

export default UiProvider
