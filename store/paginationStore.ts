import { create } from 'zustand';

interface PaginationState {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  setTotalPages: (total: number) => void;
  reset: () => void;
}

export const usePaginationStore = create<PaginationState>((set) => ({
  currentPage: 1,
  totalPages: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalPages: (total) => set({ totalPages: total }),
  reset: () => set({ currentPage: 1, totalPages: 1 }),
}));
