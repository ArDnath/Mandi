import { getProductById } from "@/lib/api/fakestore";
import { Container } from "@/components/layout/container";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { extractIdFromSlug } from "@/lib/utils/slug";
import AddToCartButton from "@/components/products/add-to-cart-button";
import AddToWishlistButton from "@/components/products/add-to-wishlist-button";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id: slug } = await params;
  const productId = extractIdFromSlug(slug);
  const product = await getProductById(productId);

  return (
    <Container className="py-12">
      <Link 
        href="/products" 
        className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-900 mb-8 transition-colors"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Product Image */}
        <div className="bg-white rounded-2xl p-8 flex items-center justify-center border border-neutral-100">
          <div className="relative w-full aspect-square max-w-[500px]">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col space-y-6">
          <div className="order-1">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-neutral-100 text-neutral-800 rounded-full mb-4 capitalize">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight mb-4">
              {product.title}
            </h1>
            <p className="text-2xl font-semibold text-neutral-900">
              ${product.price}
            </p>
          </div>

          {/* Action Buttons - Order 2 on mobile, Order 4 on desktop */}
          <div className="pt-4 flex gap-4 order-2 md:order-4">
            <div className="flex-1">
              <AddToCartButton product={product} />
            </div>
            <AddToWishlistButton product={product} />
          </div>

          <div className="prose prose-neutral max-w-none order-3 md:order-2">
            <p className="text-neutral-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {product.rating && (
            <div className="flex items-center space-x-2 text-sm order-4 md:order-3">
              <div className="flex text-yellow-400">
                {'★'.repeat(Math.round(product.rating.rate))}
                <span className="text-neutral-300">
                  {'★'.repeat(5 - Math.round(product.rating.rate))}
                </span>
              </div>
              <span className="text-neutral-500">
                ({product.rating.count} reviews)
              </span>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
