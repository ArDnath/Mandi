// lib/api/fakestore.ts
import { cache } from 'react'
import 'server-only'
import { IProduct } from "./types"

const BASE_URL = "https://fakestoreapi.com"

// Comprehensive headers to prevent API blocking
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  "Accept": "application/json, text/plain, */*",
  "Accept-Language": "en-US,en;q=0.9",
  "Referer": "https://fakestoreapi.com/",
}

/**
 * Cached fetch function with error handling
 * Using React cache to deduplicate requests automatically
 */
const fetchJSON = cache(async <T,>(url: string, revalidate: number | false = 60): Promise<T> => {
  try {
    const res = await fetch(url, {
      headers: HEADERS,
      next: revalidate === false ? { revalidate: 0 } : { revalidate },
    })

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`)
    }

    return res.json()
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error)
    throw error
  }
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

