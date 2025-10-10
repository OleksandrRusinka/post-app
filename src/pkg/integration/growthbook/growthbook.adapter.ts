import { GrowthBook } from '@growthbook/growthbook'

import { envServer } from '@/config/env'

// growthbook
const gb = new GrowthBook({
  apiHost: envServer.GROWTHBOOK_API_HOST,
  clientKey: envServer.GROWTHBOOK_CLIENT_KEY,
  enableDevMode: envServer.NODE_ENV !== 'production',
})

let initialized = false

async function ensureInitialized() {
  if (!initialized) {
    await gb.init({ timeout: 3000 })
    initialized = true
  }
}

// get feature flags
export async function getFeatureValue<T>(
  key: string,
  defaultValue: T,
  attributes: Record<string, unknown>,
): Promise<T> {
  await ensureInitialized()

  gb.setAttributes(attributes)

  const result = gb.evalFeature<T>(key)

  return result?.value ?? defaultValue
}
