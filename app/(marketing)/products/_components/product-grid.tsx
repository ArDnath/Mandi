"use client";


import { IProduct } from "@/types/api";
import { ProductCard } from "./product-card";
import { usePagination } from "@/hooks/usePagination";
import { PaginationBar } from "./pagination-bar";

interface ProductGridProps {
  products: IProduct[];
  itemsPerPage?: number;
}

export function ProductGrid({ products, itemsPerPage = 9 }: ProductGridProps) {
  const {
    currentItems,
    currentPage,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    canGoNext,
    canGoPrev,
    pageNumbers,
  } = usePagination({
    items: products,
    itemsPerPage,
    initialPage: 1,
  });

  const showPagination = totalPages > 1;

  // DEBUG: Log pagination state
  console.log('DEBUG pagination:', { totalPages, productsLength: products.length, itemsPerPage });

  return (
    <div className="mt-2 sm:mt-4 flex flex-col gap-4 sm:gap-8 px-2 sm:px-0">
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
        <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
          {currentItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      ) : (
        <div className="text-center py-12 text-neutral-500">
          No products found
        </div>
      )}

      
      {showPagination && (
        <PaginationBar
          currentPage={currentPage}
          goToPage={goToPage}
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
          canGoNext={canGoNext}
          canGoPrev={canGoPrev}
          pageNumbers={pageNumbers}
        />
      )}
    </div>
  );
}