'use client'

import { useGrowthBook } from './growthbook.provider'

export const useFeatureFlag = <T = boolean>(key: string, defaultValue: T): T => {
  const growthbook = useGrowthBook()

  if (!growthbook) {
    return defaultValue
  }

  try {
    return growthbook.getFeatureValue(key, defaultValue) as T
  } catch {
    return defaultValue
  }
}
