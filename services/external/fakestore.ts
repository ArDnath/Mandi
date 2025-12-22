// lib/api/fakestore.ts
import { cache } from 'react'
import 'server-only'
import axios from 'axios'
import { IProduct } from "@/types/api"
// Import local JSON data as fallback
import localProductsData from './fakestoreapi.json'

const BASE_URL = "https://fakestoreapi.com"

// Type assertion for the imported JSON
const localProducts = localProductsData as IProduct[]

/**
 * Axios instance with timeout configuration
 * Longer timeout for Vercel deployments where API may be slow/blocked
 */
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 second timeout (increased for Vercel)
  headers: {
    'Content-Type': 'application/json',
  },
  // Disable axios default retry to use our custom retry logic
  validateStatus: (status) => status >= 200 && status < 300,
})

/**
 * Cached fetch function using axios with retry logic
 * React cache provides deduplication and caching
 */
const fetchJSON = cache(async <T,>(url: string, revalidate: number | false = 60): Promise<T> => {
  const maxRetries = 5; // Increased for Vercel
  let lastError: Error | unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Add delay between retries to avoid rate limiting
      if (attempt > 0) {
        const delay = Math.min(2000 * Math.pow(2, attempt - 1), 10000); // Longer delays
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      // Use axios for HTTP request
      const response = await axiosInstance.get<T>(url)

      // Axios automatically parses JSON and throws on non-2xx status codes
      return response.data
    } catch (error) {
      lastError = error;
      
      // Better error logging with axios
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        
        // Don't retry on 403 - it's a permanent block, not transient
        if (status === 403) {
          console.error(`❌ API blocked (403) - Fake Store API may be blocking Vercel servers`);
          throw new Error('API_BLOCKED: Fake Store API returned 403 Forbidden');
        }
        
        console.error(`Failed to fetch ${url} (attempt ${attempt + 1}/${maxRetries + 1}):`, 
          status, error.response?.statusText || error.message);
      } else {
        console.error(`Failed to fetch ${url} (attempt ${attempt + 1}/${maxRetries + 1}):`, error);
      }
      
      // Don't retry on last attempt
      if (attempt === maxRetries) {
        throw error;
      }
    }
  }

  throw lastError;
})

/**
 * Get all products with ISR (60 second revalidation)
 * Falls back to local JSON if API fails
 */
export const getAllProducts = cache(async (): Promise<IProduct[]> => {
  try {
    return await fetchJSON<IProduct[]>(`${BASE_URL}/products`)
  } catch (error) {
    console.error('Failed to fetch products from API, using local data:', error)
    // Return local products as fallback
    return localProducts
  }
})

/**
 * Get product by ID with ISR
 * Falls back to local JSON if API fails
 */
export const getProductById = cache(async (id: number): Promise<IProduct | null> => {
  try {
    return await fetchJSON<IProduct>(`${BASE_URL}/products/${id}`)
  } catch (error) {
    console.error(`Failed to fetch product ${id} from API, searching local data:`, error)
    // Fallback to local products
    const product = localProducts.find(p => p.id === id)
    return product || null
  }
})

/**
 * Get products by category with ISR
 * Falls back to local JSON if API fails
 */
export const getProductsByCategory = cache(async (category: string): Promise<IProduct[]> => {
  try {
    return await fetchJSON<IProduct[]>(
      `${BASE_URL}/products/category/${encodeURIComponent(category)}`
    )
  } catch (error) {
    console.error(`Failed to fetch category ${category} from API, filtering local data:`, error)
    // Fallback to local products filtered by category
    return localProducts.filter(p => p.category === category)
  }
})

/**
 * Get all categories with ISR
 * Falls back to local JSON if API fails
 */
export const getAllCategories = cache(async (): Promise<string[]> => {
  try {
    return await fetchJSON<string[]>(`${BASE_URL}/products/categories`)
  } catch (error) {
    console.error('Failed to fetch categories from API, extracting from local data:', error)
    // Fallback to extracting unique categories from local products
    const categories = [...new Set(localProducts.map(p => p.category))]
    return categories
  }
})

/**
 * Search products (client-side filtering)
 */
export const searchProducts = cache(async (query: string): Promise<IProduct[]> => {
  const products = await getAllProducts()
  const lowerQuery = query.toLowerCase()
  
  return products.filter(
    (product) =>
      product.title.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery)
  )
})

/**
 * Preload function for eager data fetching
 */
export const preloadProducts = () => {
  void getAllProducts()
}

export const preloadProduct = (id: number) => {
  void getProductById(id)
}

// Re-export fetching utilities for use in other modules
export { fetchInParallel, fetchWaterfall, fetchWithRetry, prefetchData } from './fetching-utils';

