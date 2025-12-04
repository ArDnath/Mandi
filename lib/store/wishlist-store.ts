import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IProduct } from '@/lib/api/types';

interface WishlistStore {
  items: IProduct[];
  addItem: (product: IProduct) => void;
  removeItem: (productId: number) => void;
  toggleItem: (product: IProduct) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          const exists = state.items.find((item) => item.id === product.id);
          if (exists) {
            return state;
          }
          return {
            items: [...state.items, product],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      toggleItem: (product) => {
        const isInWishlist = get().isInWishlist(product.id);
        if (isInWishlist) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      },

      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
