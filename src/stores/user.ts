import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware'
import type { WritableDraft } from 'immer';

interface Media {
  collection: string;
  customProperties: any;
  fileName: string;
  id: number;
  modelableId: string;
  modelableType: string;
  name: string;
}

interface MetaData {
  addressOne: string;
  addressTwo: string;
  barangay: string;
  city: string;
  province: string;
  region: string;
  storeName: string;
  storePhone: number;
  zip: number
}

interface Merchant {
  media: Array<Media>
  metaData: MetaData
  createdAt: string;
}

export const UserRole = {
  Admin: "admin",
  Merchant: "merchant",
} as const;

export type Role = typeof UserRole[keyof typeof UserRole];

interface User {
  id?: number;
  name: string;
  email: string;
  merchant: Merchant;
  roles: Role[]
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
            state.user = user as WritableDraft<User>;
          }
        })
      },
      setMerchant:<T> (merchant: T) => {
        set((state) => {
          if (state.user && merchant) {
            state.user.merchant = merchant as WritableDraft<Merchant>;
          }
        })
      }
    })),
    {
      name: 'auth-storage'
    }
  )
)