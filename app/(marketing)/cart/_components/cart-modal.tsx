'use client';

import { useEffect, useState } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';
import Image from 'next/image';
import Link from 'next/link';
import { generateProductSlug } from '@/lib/utils/slug';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, updateQuantity, removeItem, getTotal, getItemCount } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Only show count after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <div className="flex items-center gap-2">
              <ShoppingBag size={24} className="text-neutral-900" />
              <h2 className="text-xl font-bold text-neutral-900">
                Shopping Cart {mounted && `(${getItemCount()})`}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 rounded-lg transition"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <ShoppingBag size={64} className="text-neutral-300" />
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">Your cart is empty</h3>
                  <p className="text-sm text-neutral-500 mt-1">Add some products to get started!</p>
                </div>
                <Link
                  href="/products"
                  onClick={onClose}
                  className="px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => {
                  const slug = generateProductSlug(item.product.title, item.product.id);
                  
                  return (
                    <div
                      key={item.product.id}
                      className="flex gap-4 p-4 bg-neutral-50 rounded-lg"
                    >
                      <Link
                        href={`/products/${slug}`}
                        onClick={onClose}
                        className="flex-shrink-0"
                      >
                        <div className="relative w-20 h-20 bg-white rounded-lg overflow-hidden">
                          <Image
                            src={item.product.image}
                            alt={item.product.title}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${slug}`}
                          onClick={onClose}
                        >
                          <h3 className="font-medium text-sm text-neutral-900 hover:text-neutral-600 transition line-clamp-2">
                            {item.product.title}
                          </h3>
                        </Link>
                        <p className="text-xs text-neutral-500 capitalize mt-1">
                          {item.product.category}
                        </p>
                        <p className="text-base font-semibold text-neutral-900 mt-2">
                          ${item.product.price.toFixed(2)}
                        </p>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2 border border-neutral-200 rounded-lg bg-white">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1.5 hover:bg-neutral-100 transition"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1.5 hover:bg-neutral-100 transition"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-neutral-400 hover:text-red-500 transition"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-neutral-200 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-neutral-900">Total</span>
                <span className="text-2xl font-bold text-neutral-900">
                  ${getTotal().toFixed(2)}
                </span>
              </div>

              <Link
                href="/cart"
                onClick={onClose}
                className="block w-full bg-neutral-900 text-white text-center py-3 rounded-lg font-medium hover:bg-neutral-800 transition"
              >
                View Cart & Checkout
              </Link>

              <button
                onClick={onClose}
                className="block w-full text-center text-sm text-neutral-500 hover:text-neutral-900 transition"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
