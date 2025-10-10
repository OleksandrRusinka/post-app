import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { envServer } from '@/config/env'

// interface
interface IState {}

interface IStore extends IState {
  handleAppStore: (value: Partial<IState>) => void
}
// store
export const useAppStore = create<IStore>()(
  devtools(
    (set) => ({
      handleAppStore: (value: Partial<IState>) => set((state: IState) => ({ ...state, ...value })),
    }),
    { enabled: envServer.NODE_ENV !== 'production' && typeof window !== 'undefined' },
  ),
)
