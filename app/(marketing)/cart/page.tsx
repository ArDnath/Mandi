'use client';

import { Container } from "@/components/layout/container";
import { useCartStore } from "@/lib/store/cart-store";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { generateProductSlug } from "@/lib/utils/slug";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <Container className="py-16">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-neutral-900">Your Cart is Empty</h1>
          <p className="text-neutral-500">Add some products to get started!</p>
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
        <h1 className="text-3xl font-bold text-neutral-900">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm text-neutral-500 hover:text-red-500 transition"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const slug = generateProductSlug(item.product.title, item.product.id);
            
            return (
              <div 
                key={item.product.id} 
                className="flex gap-4 p-4 bg-white border border-neutral-200 rounded-lg"
              >
                <Link href={`/products/${slug}`} className="flex-shrink-0">
                  <div className="relative w-24 h-24 bg-neutral-100 rounded-lg overflow-hidden">
                    <Image
                      src={item.product.image}
                      alt={item.product.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </Link>

                <div className="flex-grow">
                  <Link href={`/products/${slug}`}>
                    <h3 className="font-medium text-neutral-900 hover:text-neutral-600 transition line-clamp-2">
                      {item.product.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-neutral-500 capitalize mt-1">
                    {item.product.category}
                  </p>
                  <p className="text-lg font-semibold text-neutral-900 mt-2">
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-neutral-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={18} />
                  </button>

                  <div className="flex items-center gap-2 border border-neutral-200 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-2 hover:bg-neutral-100 transition"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-2 hover:bg-neutral-100 transition"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>

            <div className="border-t border-neutral-300 pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold text-neutral-900">
                <span>Total</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-neutral-900 text-white py-3 rounded-lg font-medium hover:bg-neutral-800 transition">
              Proceed to Checkout
            </button>

            <Link 
              href="/products"
              className="block text-center text-sm text-neutral-500 hover:text-neutral-900 mt-4 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
