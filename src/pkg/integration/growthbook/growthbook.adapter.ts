import { GrowthBook } from '@growthbook/growthbook'

import { envServer } from '@/config/env/env.server'

// growthbook instance
const gb = new GrowthBook({
  apiHost: envServer.GROWTHBOOK_API_HOST,
  clientKey: envServer.GROWTHBOOK_CLIENT_KEY,
  enableDevMode: envServer.NODE_ENV !== 'production',
})

let initialized = false
async function ensureInitialized() {
  if (!initialized) {
    await gb.init({ timeout: 2000 })
    initialized = true
  }
}

// get feature flag value
export async function getFeatureValue<T>(
  key: string,
  defaultValue: T,
  attributes: Record<string, unknown>,
): Promise<T> {
  await ensureInitialized()

  gb.setAttributes(attributes)

  // evaluate feature
  const result = gb.evalFeature<T>(key)

  return result?.value ?? defaultValue
}
