import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

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
    { enabled: process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' },
  ),
)
