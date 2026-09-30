import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer';

interface Loader {
  pendingRequest: number;
  incrementPending: () => void;
  decrementPending: () => void;
}

export const useLoaderStore = create<Loader>()(
    immer((set) => ({
      pendingRequest: 0,
      incrementPending: () => {
        set((state) => {
            state.pendingRequest++
        })
      },
      decrementPending: () => {
        set((state) => {
            state.pendingRequest--
        })
      }
    }))
)