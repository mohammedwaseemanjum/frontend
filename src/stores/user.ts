import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware'

interface User {
  id?: number;
  name?: string;
  email?: string;
  merchant?: any
}

interface UserStateI {
  user: User|null;
  setUser:<T> (user: T) => void;
  setMerchant:<T> (merchant: T) => void
}

export const useUserStore = create<UserStateI>()(
  persist(
    immer((set) => ({
      user: null,
      setUser:<T> (user: T) => {
        set((state) => {
          if (user) {
            state.user = user
          }
        })
      },
      setMerchant:<T> (merchant: T) => {
        set((state) => {
          if (state.user) {
            state.user.merchant = merchant
          }
        })
      }
    })),
    {
      name: 'auth-storage'
    }
  )
)