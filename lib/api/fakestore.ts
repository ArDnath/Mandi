// lib/api/fakestore.ts
import { cache } from 'react'
import 'server-only'
import axios from 'axios'
import { IProduct } from "./types"

const BASE_URL = "https://fakestoreapi.com"

/**
 * Axios instance with timeout configuration
 */
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  }
})

/**
 * Cached fetch function using axios with retry logic
 * React cache provides deduplication and caching
 */
const fetchJSON = cache(async <T,>(url: string, revalidate: number | false = 60): Promise<T> => {
  const maxRetries = 3;
  let lastError: Error | unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Add delay between retries to avoid rate limiting
      if (attempt > 0) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
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
        console.error(`Failed to fetch ${url} (attempt ${attempt + 1}/${maxRetries + 1}):`, 
          error.response?.status, error.response?.statusText || error.message);
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
 * Falls back gracefully if API fails during build
 */
export const getAllProducts = cache(async (): Promise<IProduct[]> => {
  try {
    return await fetchJSON<IProduct[]>(`${BASE_URL}/products`)
  } catch (error) {
    console.error('Failed to fetch products:', error)
    // Return empty array as fallback during build
    return []
  }
})

/**
 * Get product by ID with ISR
 */
export const getProductById = cache(async (id: number): Promise<IProduct | null> => {
  try {
    return await fetchJSON<IProduct>(`${BASE_URL}/products/${id}`)
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error)
    return null
  }
})

/**
 * Get products by category with ISR
 */
export const getProductsByCategory = cache(async (category: string): Promise<IProduct[]> => {
  try {
    return await fetchJSON<IProduct[]>(
      `${BASE_URL}/products/category/${encodeURIComponent(category)}`
    )
  } catch (error) {
    console.error(`Failed to fetch category ${category}:`, error)
    return []
  }
})

/**
 * Get all categories with ISR
 */
export const getAllCategories = cache(async (): Promise<string[]> => {
  try {
    return await fetchJSON<string[]>(`${BASE_URL}/products/categories`)
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return []
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

