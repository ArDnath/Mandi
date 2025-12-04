import { getAllProducts } from "@/lib/api/fakestore";
import { ProductCard } from "@/components/products/product-card";
import { Container } from "@/components/layout/container";

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <Container className="py-12">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">All Products</h1>
          <p className="text-neutral-500">Browse our collection of high-quality items.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Container>
  );
}
