"use client";

import React from "react";
import { IProduct } from "@/lib/api/types";
import { ProductCard } from "./ProductCard";
import { usePaginationStore } from "@/store/paginationStore";
import { PaginationBar } from "./PaginationBar";

interface ProductGridProps {
  products: IProduct[];
  itemsPerPage?: number;
}

export function ProductGrid({ products, itemsPerPage = 9 }: ProductGridProps) {
  const currentPage = usePaginationStore((state) => state.currentPage);
  const setCurrentPage = usePaginationStore((state) => state.setCurrentPage);
  const setTotalPages = usePaginationStore((state) => state.setTotalPages);

  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = products.slice(startIndex, endIndex);

  React.useEffect(() => {
    setTotalPages(totalPages);
    if (currentPage > totalPages) setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages, setTotalPages, currentPage, setCurrentPage]);

  const goToPage = (page: number) => setCurrentPage(page);
  const goToNextPage = () => setCurrentPage(Math.min(currentPage + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage(Math.max(currentPage - 1, 1));
  const canGoNext = currentPage < totalPages;
  const canGoPrev = currentPage > 1;

  // Page numbers logic (same as before)
  const maxVisible = 5;
  let pageNumbers: (number | string)[] = [];
  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) pageNumbers.push(i);
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1);
      pageNumbers.push('...');
      for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      pageNumbers.push(1);
      pageNumbers.push('...');
      pageNumbers.push(currentPage - 1);
      pageNumbers.push(currentPage);
      pageNumbers.push(currentPage + 1);
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }
  }

  // Don't show pagination if there's only one page or no products
  const showPagination = totalPages > 1;

  return (
    <div className="mt-4 flex flex-col gap-8">
      {/* Results Count */}
      {products.length > 0 && (
        <div className="text-sm text-neutral-600">
          Showing <span className="font-medium">{startIndex + 1}</span> -{" "}
          <span className="font-medium">{endIndex}</span> of{" "}
          <span className="font-medium">{totalItems}</span> products
        </div>
      )}

      {/* Grid */}
      {currentItems.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      ) : (
        <div className="text-center py-12 text-neutral-500">
          No products found
        </div>
      )}

      {/* Pagination */}
      {showPagination && (
        <PaginationBar totalPages={totalPages} />
      )}
    </div>
  );
}