'use client';

import { Search as SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';

interface SearchInputProps {
  className?: string;
  placeholder?: string;
  variant?: 'desktop' | 'mobile';
  initialValue?: string;
}

// Inner component that uses useSearchParams
function SearchInputInner({ 
  className = '', 
  placeholder = 'Search products...',
  variant = 'desktop',
  initialValue = ''
}: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(initialValue);

  // Only update from URL on initial load
  useEffect(() => {
    const query = searchParams?.get('q') || '';
    setSearchValue(query);
  }, []); // Empty dependency array to run only once on mount

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (searchValue.trim()) {
      params.set('q', searchValue.trim());
    }
    
    router.push(`/products?${params.toString()}`);
  };

  const inputClass = variant === 'mobile' 
    ? 'block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm'
    : 'block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm';

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={inputClass}
        aria-label="Search products"
      />
    </div>
  );
}

// Wrapper component that provides Suspense boundary
export default function SearchInput(props: SearchInputProps) {
  return (
    <Suspense fallback={
      <div className={`relative ${props.className || ''}`}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="search"
          disabled
          placeholder={props.placeholder}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed"
        />
      </div>
    }>
      <SearchInputInner {...props} />
    </Suspense>
  );
}
