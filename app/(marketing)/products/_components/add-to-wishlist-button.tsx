'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/lib/store/wishlist-store';
import { IProduct } from '@/types/api';

interface AddToWishlistButtonProps {
  product: IProduct;
  className?: string;
}

export default function AddToWishlistButton({ 
  product, 
  className = '' 
}: AddToWishlistButtonProps) {
  const { toggleItem, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    toggleItem(product);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      onClick={handleToggle}
      className={`
        flex items-center justify-center gap-2 px-6 py-3 
        rounded-lg font-medium transition-all
        ${inWishlist 
          ? 'bg-red-50 text-red-600 border-2 border-red-600 hover:bg-red-100' 
          : 'bg-white text-neutral-600 border-2 border-neutral-300 hover:border-red-400 hover:text-red-500'
        }
        ${isAnimating ? 'scale-95' : 'scale-100'}
        ${className}
      `}
      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart 
        size={20} 
        className={`transition-all ${isAnimating ? 'scale-125' : 'scale-100'}`}
        fill={inWishlist ? 'currentColor' : 'none'}
      />
      {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
    </button>
  );
}
