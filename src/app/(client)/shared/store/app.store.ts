import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// interface
interface IStore {
  currentPage: number
  setCurrentPage: (page: number) => void

  isCreateModalOpen: boolean
  setCreateModalOpen: (isOpen: boolean) => void

  isLoading: boolean
  setLoading: (loading: boolean) => void

  reset: () => void
}

const initialState = {
  currentPage: 1,
  isCreateModalOpen: false,
  isLoading: false,
}

// store
export const useAppStore = create<IStore>()(
  devtools(
    (set) => ({
      ...initialState,

      setCurrentPage: (page) => set({ currentPage: page }),
      setCreateModalOpen: (isOpen) => set({ isCreateModalOpen: isOpen }),
      setLoading: (loading) => set({ isLoading: loading }),

      reset: () => set(initialState),
    }),
    {
      name: 'app-store',
    },
  ),
)
