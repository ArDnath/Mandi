import { useState,useMemo } from "react";

interface usePagination<T>{
    items:T[];
    itemsPerPage: number;
    initialPage?: number;
}

interface usePaginationReturn<T>{
    currentItems: T[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    startIndex: number;
    endIndex: number;
    goToPage: (page: number)=> void;
    goToNextPage: () => void;
    goToPreviousPage: () => void;
    canGoNext: boolean;
    canGoPrev: boolean;
    pageNumbers: (number |string)[];
}

export function usePagination<T>({
    items,
    itemsPerPage=9,
    initialPage=1
}:usePagination<T>):usePaginationReturn<T>{

    const [currentPage,setCurrentPage] =useState(initialPage);

    const totalPages= Math.ceil(items.length/itemsPerPage);

    const startIndex = (currentPage-1)*itemsPerPage;;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = useMemo(
        ()=> items.slice(startIndex,endIndex),
        [items, startIndex, endIndex]
    );

    const goToPage =(page: number) =>{
        const pageNumber = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(pageNumber);
        
    }

    const goToNextPage =()=>{
        if(currentPage< totalPages){
            goToPage(currentPage+1);
        }
    }
    const goToPreviousPage =() =>{
        if(currentPage > 1){
            goToPage(currentPage - 1);
        }
    }
    const pageNumbers = useMemo(() => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;
    
        if (totalPages <= maxVisible) {
          for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          if (currentPage <= 3) {
            for (let i = 1; i <= 4; i++) {
              pages.push(i);
            }
            pages.push('...');
            pages.push(totalPages);
          } else if (currentPage >= totalPages - 2) {
            pages.push(1);
            pages.push('...');
            for (let i = totalPages - 3; i <= totalPages; i++) {
              pages.push(i);
            }
          } else {
            pages.push(1);
            pages.push('...');
            pages.push(currentPage - 1);
            pages.push(currentPage);
            pages.push(currentPage + 1);
            pages.push('...');
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
        endIndex: Math.min(endIndex, items.length),
        goToPage,
        goToNextPage,
        goToPreviousPage,
        canGoNext: currentPage < totalPages,
        canGoPrev: currentPage > 1,
        pageNumbers,
      };
    }