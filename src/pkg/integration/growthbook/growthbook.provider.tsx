'use client'

import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'

import { growthbook } from './flags'

// interface
interface IProps {
  children: ReactNode
}

export const GrowthBookContext = createContext(growthbook)

// component
export const GrowthBookProvider: FC<Readonly<IProps>> = (props) => {
  const { children } = props
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const initGrowthBook = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY && !process.env.GROWTHBOOK_CLIENT_KEY) {
          setIsReady(true)
          return
        }

        growthbook.setAttributes({
          id: 'anonymous',
          deviceType: typeof window !== 'undefined' ? (window.innerWidth < 768 ? 'mobile' : 'desktop') : 'unknown',
        })

        await growthbook.loadFeatures()
        setIsReady(true)
      } catch {
        setIsReady(true)
      }
    }

    initGrowthBook()
  }, [])

  if (!isReady) {
    return <>{children}</>
  }

  // return
  return <GrowthBookContext.Provider value={growthbook}>{children}</GrowthBookContext.Provider>
}

export const useGrowthBook = () => useContext(GrowthBookContext)
export default GrowthBookProvider
