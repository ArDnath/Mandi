import React from "react";
import { Container } from "@/components/layout/container";
import FilterBar from "@/components/home/filter-bar";
import HeroSection from "@/components/home/hero-section";
import { getAllProducts } from "@/lib/api/fakestore";
import { IProduct } from "@/lib/api/types";
import { ProductGrid } from "@/components/products/product-grid";

export const runtime = "nodejs";
// Revalidate page every hour (3600 seconds) for ISR
export const revalidate = 3600;

async function Home() {
  console.log('[PAGE] Home page rendering - fetching products...');
  const products: IProduct[] = await getAllProducts();
  console.log(`[PAGE] Home page - fetched ${products.length} products`);
  
  return (
    <Container className="flex gap-2">
      <aside className="hidden md:block w-72 lg:w-80">
        <FilterBar />
      </aside>

      <main className="flex-1 min-h-screen mt-12">
        <div className="pt-6 md:pt-8">
          <HeroSection />
        </div>

        <div>
          <h2 className="mt-12 w-36 p-2 px-4 bg-neutral-100">
            show sidebar
          </h2>
        </div>

        {products.length > 0 ? (
          <ProductGrid products={products} itemsPerPage={9} />
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-600">Unable to load products. Please try again later.</p>
          </div>
        )}
      </main>
    </Container>
  );
}

export default Home;
