'use client';

import { Container } from "@/components/layout/container";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useCartStore } from "@/lib/store/cart-store";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react";
import { generateProductSlug } from "@/lib/utils/slug";
import { useState } from "react";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addItem);
  const [addedItems, setAddedItems] = useState<Set<number>>(new Set());

  const handleAddToCart = (productId: number) => {
    const product = items.find(item => item.id === productId);
    if (product) {
      addToCart(product);
      setAddedItems(prev => new Set(prev).add(productId));
      setTimeout(() => {
        setAddedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
      }, 2000);
    }
  };

  if (items.length === 0) {
    return (
      <Container className="py-16">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <Heart size={64} className="text-neutral-300" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900">Your Wishlist is Empty</h1>
          <p className="text-neutral-500">Save your favorite items for later!</p>
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition"
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">My Wishlist</h1>
        <button
          onClick={clearWishlist}
          className="text-sm text-neutral-500 hover:text-red-500 transition"
        >
          Clear Wishlist
        </button>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {items.map((product) => {
          const slug = generateProductSlug(product.title, product.id);
          const isAdded = addedItems.has(product.id);
          
          return (
            <div 
              key={product.id} 
              className="bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Product Image */}
              <Link href={`/products/${slug}`} className="block">
                <div className="relative w-full aspect-square bg-neutral-50 p-4 sm:p-8">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>

              {/* Product Details */}
              <div className="p-3 sm:p-6 space-y-2 sm:space-y-4">
                <div>
                  <span className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-medium bg-neutral-100 text-neutral-800 rounded-full mb-1 sm:mb-2 capitalize">
                    {product.category}
                  </span>
                  <Link href={`/products/${slug}`}>
                    <h3 className="font-semibold text-xs sm:text-base text-neutral-900 hover:text-neutral-600 transition line-clamp-2 mb-1 sm:mb-2">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="text-sm sm:text-xl font-bold text-neutral-900">
                    ${product.price.toFixed(2)}
                  </p>
                </div>

                {/* Rating */}
                {product.rating && (
                  <div className="hidden sm:flex items-center gap-2 text-sm">
                    <div className="flex text-yellow-400">
                      {'★'.repeat(Math.round(product.rating.rate))}
                      <span className="text-neutral-300">
                        {'★'.repeat(5 - Math.round(product.rating.rate))}
                      </span>
                    </div>
                    <span className="text-neutral-500">
                      ({product.rating.count})
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 sm:gap-3 pt-1 sm:pt-2">
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className={`
                      flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 py-2 sm:px-4 sm:py-2.5 
                      rounded-lg font-medium transition-all text-xs sm:text-base
                      ${isAdded 
                        ? 'bg-green-500 text-white' 
                        : 'bg-neutral-900 text-white hover:bg-neutral-800'
                      }
                    `}
                    disabled={isAdded}
                  >
                    <ShoppingCart size={14} className="sm:w-[18px] sm:h-[18px]" />
                    {isAdded ? 'Added' : 'Add'}
                  </button>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="px-2 py-2 sm:px-4 sm:py-2.5 border-2 border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Heart size={14} className="sm:w-[18px] sm:h-[18px]" fill="currentColor" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Continue Shopping Link */}
      <div className="mt-8 text-center">
        <Link 
          href="/products"
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition"
        >
          <ArrowLeft size={18} />
          Continue Shopping
        </Link>
      </div>
    </Container>
  );
}
