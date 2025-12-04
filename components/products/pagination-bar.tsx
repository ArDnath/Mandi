"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationBarProps {
  currentPage: number;
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  pageNumbers: (number | string)[];
}

export function PaginationBar({
  currentPage,
  goToPage,
  goToNextPage,
  goToPreviousPage,
  canGoNext,
  canGoPrev,
  pageNumbers,
}: PaginationBarProps) {
  return (
    <nav
      className="flex flex-row items-center justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-2"
      aria-label="Pagination"
    >
      <button
        onClick={goToPreviousPage}
        disabled={!canGoPrev}
        className={`flex items-center gap-1 px-2 sm:px-4 py-2 border rounded-md transition-colors ${
          !canGoPrev
            ? "border-neutral-200 text-neutral-400 cursor-not-allowed"
            : "border-neutral-300 text-neutral-700 hover:bg-neutral-100"
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-hide w-full justify-center">
        {pageNumbers.map((page: number | string, idx: number) =>
          typeof page === "string" ? (
            <span
              key={`ellipsis-${idx}`}
              className="px-2 text-neutral-500"
              aria-hidden="true"
            >
              {page}
            </span>
          ) : (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`min-w-[32px] sm:min-w-[40px] px-2 sm:px-3 py-2 border rounded-md transition-colors text-sm sm:text-base ${
                page === currentPage
                  ? "bg-neutral-800 text-white border-neutral-800"
                  : "border-neutral-300 text-neutral-700 hover:bg-neutral-100"
              }`}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={goToNextPage}
        disabled={!canGoNext}
        className={`flex items-center gap-1 px-2 sm:px-4 py-2 border rounded-md transition-colors ${
          !canGoNext
            ? "border-neutral-200 text-neutral-400 cursor-not-allowed"
            : "border-neutral-300 text-neutral-700 hover:bg-neutral-100"
        }`}
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}
