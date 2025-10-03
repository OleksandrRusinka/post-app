'use client'

import { useGrowthBook } from './growthbook.provider'

/**
 * Hook to get a feature flag value
 * @param key - Feature flag key
 * @param defaultValue - Default value if flag is not found
 * @returns Feature flag value
 */
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
