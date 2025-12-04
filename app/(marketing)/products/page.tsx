import { getAllProducts, searchProducts } from "@/lib/api/fakestore";
import { ProductCard } from "@/components/products/product-card";
import { Container } from "@/components/layout/container";

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { q } = await searchParams;
  const query = typeof q === 'string' ? q : undefined;
  
  const products = query ? await searchProducts(query) : await getAllProducts();

  return (
    <Container className="py-12">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
            {query ? `Search Results for "${query}"` : "All Products"}
          </h1>
          <p className="text-neutral-500">
            {query 
              ? `Found ${products.length} product${products.length === 1 ? '' : 's'}` 
              : "Browse our collection of high-quality items."}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Container>
  );
}
