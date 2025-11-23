import { useEffect, useMemo } from "react";
import { usePaginationStore } from "@/store/paginationStore";

interface usePaginationProps<T> {
  items: T[];
  itemsPerPage: number;
  initialPage?: number;
}

interface usePaginationReturn<T> {
  currentItems: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  pageNumbers: (number | string)[];
}

export function usePagination<T>({
  items,
  itemsPerPage = 9,
  initialPage = 1,
}: usePaginationProps<T>): usePaginationReturn<T> {
  const {
    currentPage,
    totalPages,
    setCurrentPage,
    setTotalPages,
    itemsPerPage: storeItemsPerPage,
    setItemsPerPage,
    setTotalItems,
    goToNextPage,
    goToPreviousPage,
  } = usePaginationStore();

  // Keep store in sync with items, itemsPerPage, and initialPage
  useEffect(() => {
    setItemsPerPage(itemsPerPage);
    setTotalItems(items.length);
    setTotalPages(Math.max(1, Math.ceil(items.length / itemsPerPage)));
    setCurrentPage(initialPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, itemsPerPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, items.length);
  const currentItems = useMemo(
    () => items.slice(startIndex, endIndex),
    [items, startIndex, endIndex]
  );

  const goToPage = (page: number) => setCurrentPage(page);

  const canGoNext = currentPage < totalPages;
  const canGoPrev = currentPage > 1;
  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  }, [currentPage, totalPages]);

  return {
    currentItems,
    currentPage,
    totalPages,
    totalItems: items.length,
    startIndex,
    endIndex,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    canGoNext,
    canGoPrev,
    pageNumbers,
  };
}