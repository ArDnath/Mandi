'use client';

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';
import { IProduct } from '@/lib/api/types';

interface AddToCartButtonProps {
  product: IProduct;
  quantity?: number;
  className?: string;
}

export default function AddToCartButton({ 
  product, 
  quantity = 1,
  className = '' 
}: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsAdded(true);
    
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`
        w-full flex items-center justify-center gap-2 px-6 py-3 
        rounded-lg font-medium transition-all
        ${isAdded 
          ? 'bg-green-500 text-white' 
          : 'bg-neutral-900 text-white hover:bg-neutral-800'
        }
        ${className}
      `}
      disabled={isAdded}
    >
      {isAdded ? (
        <>
          <Check size={20} />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart size={20} />
          Add to Cart
        </>
      )}
    </button>
  );
}
