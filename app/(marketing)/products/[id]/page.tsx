import { getProductById } from "@/services/external/fakestore";
import { Container } from "@/components/layout/container";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { extractIdFromSlug } from "@/lib/utils/slug";
import AddToCartButton from "@/app/(marketing)/products/_components/add-to-cart-button";
import AddToWishlistButton from "@/app/(marketing)/products/_components/add-to-wishlist-button";
import { notFound } from "next/navigation";

export const runtime = "nodejs";
// Revalidate page every hour (3600 seconds) for ISR
export const revalidate = 3600;
// Allow dynamic params for products not in generateStaticParams
export const dynamicParams = true;

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Generate static params for popular products at build time
 * This enables static generation for a small subset of products
 * Other products will be generated on-demand (ISR)
 * 
 * Note: Skips static generation on Vercel due to Fake Store API blocking
 */
export async function generateStaticParams() {
  // Skip static generation on Vercel to avoid 403 errors
  // Fake Store API often blocks Vercel's build servers
  if (process.env.VERCEL || process.env.VERCEL_ENV) {
    console.log('⚠️ Running on Vercel - Skipping static generation to avoid API blocks');
    console.log('ℹ️ Pages will be generated on-demand at runtime (ISR)');
    return [];
  }

  try {
    const { getAllProducts } = await import('@/services/external/fakestore');
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const products = await getAllProducts();
    
    if (!products || products.length === 0) {
      console.warn('No products available for static generation');
      return [];
    }
    
    // Generate static pages for only first 5 products to avoid rate limiting
    const staticProducts = products.slice(0, 5).map((product) => ({
      id: product.id.toString(),
    }));
    
    console.log(`Generating ${staticProducts.length} static product pages`);
    return staticProducts;
  } catch (error) {
    console.error('Error generating static params:', error);
    // Return empty array to allow build to continue without static pages
    // Pages will be generated on-demand at runtime
    return [];
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id: slug } = await params;
  const productId = extractIdFromSlug(slug);
  const product = await getProductById(productId);

  // If product is not found, return 404
  if (!product) {
    notFound();
  }

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
