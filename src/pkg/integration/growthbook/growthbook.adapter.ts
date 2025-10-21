import { GrowthBook } from '@growthbook/growthbook'

import { envServer } from '@/config/env'

import 'server-only'

class GrowthBookManager {
  private static instance: GrowthBook
  private static initialized = false

  private static getClient(): GrowthBook {
    if (!GrowthBookManager.instance) {
      GrowthBookManager.instance = new GrowthBook({
        apiHost: envServer.GROWTHBOOK_API_HOST,
        clientKey: envServer.GROWTHBOOK_CLIENT_KEY,
        enableDevMode: envServer.NODE_ENV !== 'production',
      })
    }
    return GrowthBookManager.instance
  }

  private static async ensureInitialized(): Promise<void> {
    if (!GrowthBookManager.initialized) {
      await GrowthBookManager.getClient().init({ timeout: 3000 })
      GrowthBookManager.initialized = true
    }
  }

  static async getFeatureValue<T>(key: string, defaultValue: T, attributes?: Record<string, unknown>): Promise<T> {
    await GrowthBookManager.ensureInitialized()
    const client = GrowthBookManager.getClient()

    if (attributes) client.setAttributes(attributes)

    return client.evalFeature<T>(key)?.value ?? defaultValue
  }
}

export const getFeatureValue = GrowthBookManager.getFeatureValue.bind(GrowthBookManager)
