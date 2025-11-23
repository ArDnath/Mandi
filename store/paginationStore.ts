import { create } from 'zustand';

interface PaginationState {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  setCurrentPage: (page: number) => void;
  setTotalPages: (total: number) => void;
  setItemsPerPage: (count: number) => void;
  setTotalItems: (count: number) => void;
  reset: () => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

export const usePaginationStore = create<PaginationState>((set, get) => ({
  currentPage: 1,
  totalPages: 1,
  itemsPerPage: 9,
  totalItems: 0,
  setCurrentPage: (page) => {
    const { totalPages } = get();
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    set({ currentPage: pageNumber });
  },
  setTotalPages: (total) => set({ totalPages: total }),
  setItemsPerPage: (count) => set({ itemsPerPage: count }),
  setTotalItems: (count) => set({ totalItems: count }),
  reset: () => set({ currentPage: 1, totalPages: 1, totalItems: 0 }),
  goToNextPage: () => {
    const { currentPage, totalPages, setCurrentPage } = get();
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  },
  goToPreviousPage: () => {
    const { currentPage, setCurrentPage } = get();
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  },
}));
