import 'server-only';

/**
 * Utility functions for optimized data fetching patterns
 * Supports both waterfall (sequential) and parallel fetching strategies
 */

/**
 * Fetch multiple independent data sources in parallel
 * Use this when data sources don't depend on each other
 * 
 * @example
 * const [products, categories] = await fetchInParallel([
 *   getAllProducts(),
 *   getAllCategories()
 * ]);
 */
export async function fetchInParallel<T extends readonly unknown[]>(
  promises: readonly [...{ [K in keyof T]: Promise<T[K]> }]
): Promise<T> {
  return Promise.all(promises) as Promise<T>;
}

/**
 * Fetch data in a waterfall pattern (sequential)
 * Use this when each fetch depends on the result of the previous one
 * 
 * @example
 * const result = await fetchWaterfall(async () => {
 *   const product = await getProductById(1);
 *   const relatedProducts = await getProductsByCategory(product.category);
 *   return { product, relatedProducts };
 * });
 */
export async function fetchWaterfall<T>(
  fetchFn: () => Promise<T>
): Promise<T> {
  return fetchFn();
}

/**
 * Fetch with retry logic for resilient data fetching
 * Automatically retries failed requests with exponential backoff
 * 
 * @param fetchFn - Function that returns a promise to fetch data
 * @param options - Retry configuration options
 */
export async function fetchWithRetry<T>(
  fetchFn: () => Promise<T>,
  options: {
    maxRetries?: number;
    initialDelay?: number;
    maxDelay?: number;
    backoffMultiplier?: number;
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    backoffMultiplier = 2,
  } = options;

  let lastError: Error | unknown;
  let delay = initialDelay;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fetchFn();
    } catch (error) {
      lastError = error;
      
      // Don't retry on last attempt
      if (attempt === maxRetries) {
        break;
      }

      // Wait before retrying with exponential backoff
      await new Promise(resolve => setTimeout(resolve, Math.min(delay, maxDelay)));
      delay *= backoffMultiplier;
    }
  }

  throw lastError;
}

/**
 * Type-safe wrapper for fetching multiple items by ID in parallel
 * Useful for batch fetching related items
 */
export async function fetchByIds<T>(
  ids: number[],
  fetchFn: (id: number) => Promise<T | null>
): Promise<(T | null)[]> {
  return Promise.all(ids.map(id => fetchFn(id)));
}

/**
 * Prefetch data without blocking - useful for eager loading
 * The promise is not awaited, allowing the fetch to happen in background
 */
export function prefetchData<T>(fetchFn: () => Promise<T>): void {
  // Start the fetch but don't await it
  // React cache will deduplicate if the same data is requested later
  void fetchFn();
}
