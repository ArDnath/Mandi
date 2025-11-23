import React from "react";
import { IProduct } from "@/lib/api/types";

interface ProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="hover:shadow-md transition">
      <div className="aspect-4/5 mb-3 flex items-center justify-center bg-neutral-100">
        <img
          src={product.image}
          alt={product.title}
          className="h-full p-16 object-contain"
        />
      </div>

      <div className="flex flex-col items-center text-center mt-2">
        <h2 className="text-sm font-medium text-neutral-800 line-clamp-2 mb-1">
          {product.title}
        </h2>

        <p className="text-lg font-semibold text-neutral-900 tracking-tight">
          ${product.price}
        </p>
      </div>
    </article>
  );
}
