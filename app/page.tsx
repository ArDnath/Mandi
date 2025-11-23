import React from "react";
import { Container } from "@/components/container";
import FilterBar from "@/components/home/FilterBar";
import HeroSection from "@/components/home/Hero";
import { getAllProducts } from "@/lib/api/fakestore";
import { IProduct } from "@/lib/api/types";
import { ProductGrid } from "@/components/products/ProductGrid";

async function Home() {
  const products: IProduct[] = await getAllProducts();

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

        <ProductGrid products={products} itemsPerPage={9} />
      </main>
    </Container>
  );
}

export default Home;
