"use client";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePaginationStore } from "@/store/paginationStore";

interface PaginationBarProps {
  totalPages: number;
}

export function PaginationBar({ totalPages }: PaginationBarProps) {
  const currentPage = usePaginationStore((state) => state.currentPage);
  const setCurrentPage = usePaginationStore((state) => state.setCurrentPage);
  const canGoNext = currentPage < totalPages;
  const canGoPrev = currentPage > 1;

  // Page numbers logic
  const maxVisible = 5;
  let pageNumbers: (number | string)[] = [];
  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) pageNumbers.push(i);
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1);
      pageNumbers.push("...");
      for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      pageNumbers.push(1);
      pageNumbers.push("...");
      pageNumbers.push(currentPage - 1);
      pageNumbers.push(currentPage);
      pageNumbers.push(currentPage + 1);
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }
  }

  return (
    <nav
      className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
      aria-label="Pagination"
    >
      {/* Previous Button */}
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={!canGoPrev}
        className={`flex items-center gap-1 px-4 py-2 border rounded-md transition-colors ${
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
      <div className="flex items-center gap-2">
        {pageNumbers.map((page, idx) =>
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
              onClick={() => setCurrentPage(page)}
              className={`min-w-[40px] px-3 py-2 border rounded-md transition-colors ${
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
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={!canGoNext}
        className={`flex items-center gap-1 px-4 py-2 border rounded-md transition-colors ${
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
