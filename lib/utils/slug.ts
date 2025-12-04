/**
 * Generate a URL-friendly slug from a product title and ID
 * Example: "Mens Casual Premium Slim Fit T-Shirts" -> "mens-casual-premium-slim-fit-t-shirts-1"
 */
export function generateProductSlug(title: string, id: number): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  return `${slug}-${id}`;
}

/**
 * Extract product ID from a slug
 * Example: "mens-casual-premium-slim-fit-t-shirts-1" -> 1
 */
export function extractIdFromSlug(slug: string): number {
  const parts = slug.split('-');
  const id = parseInt(parts[parts.length - 1]);
  
  if (isNaN(id)) {
    throw new Error(`Invalid product slug: ${slug}`);
  }
  
  return id;
}
