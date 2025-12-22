import React from "react";
import Link from "next/link";
import { generateProductSlug } from "@/lib/utils/slug";
import { IProduct } from "@/types/api";

interface ProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const slug = generateProductSlug(product.title, product.id);
  
  return (
    <Link href={`/products/${slug}`} className="block h-full">
      <article className="hover:shadow-md transition h-full flex flex-col">
        <div className="aspect-4/5 mb-3 flex items-center justify-center bg-neutral-100">
          <img
            src={product.image}
            alt={product.title}
            className="h-full p-4 sm:p-10 md:p-16 object-contain w-full"
          />
        </div>

        <div className="flex flex-col items-center text-center mt-2 flex-grow">
          <h2 className="text-xs sm:text-sm font-medium text-neutral-800 line-clamp-2 mb-1">
            {product.title}
          </h2>

          <p className="text-sm sm:text-lg font-semibold text-neutral-900 tracking-tight mt-auto">
            ${product.price}
          </p>
        </div>
      </article>
    </Link>
  );
}
