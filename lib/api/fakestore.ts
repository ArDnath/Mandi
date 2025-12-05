// lib/api.ts
import { IProduct } from "./types"; // adjust path as needed

const BASE_URL = "https://fakestoreapi.com";

async function fetchJSON<T>(url: string, revalidateSeconds = 60): Promise<T> {
  // revalidateSeconds: number | 0 for dynamic? use 0 to force dynamic (but avoid 0 if you want static)
  const nextOptions = revalidateSeconds === 0 ? { cache: "no-store" } : { revalidate: revalidateSeconds };

  const res = await fetch(url, { 
    next: nextOptions as any,
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      "Accept": "application/json, text/plain, */*",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      "Referer": "https://fakestoreapi.com/",
      "Origin": "https://fakestoreapi.com",
      "Connection": "keep-alive",
      "Cache-Control": "no-cache",
      "Pragma": "no-cache"
    }
  }); 
  // TypeScript may complain about next type shape in some setups, that's OK
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

/**
 * Default: ISR with 60 seconds revalidation.
 * If you want strictly static at build time -> call fetchJSON(url, -1) and change function to handle -1 -> cache:'force-cache'
 */

export async function getAllProducts(revalidateSeconds = 60): Promise<IProduct[]> {
  return fetchJSON<IProduct[]>(`${BASE_URL}/products`, revalidateSeconds);
}

export async function getProductById(id: number, revalidateSeconds = 60): Promise<IProduct> {
  return fetchJSON<IProduct>(`${BASE_URL}/products/${id}`, revalidateSeconds);
}

export async function getProductsByCategory(category: string, revalidateSeconds = 60): Promise<IProduct[]> {
  return fetchJSON<IProduct[]>(`${BASE_URL}/products/category/${encodeURIComponent(category)}`, revalidateSeconds);
}

export async function getAllCategories(revalidateSeconds = 60): Promise<string[]> {
  return fetchJSON<string[]>(`${BASE_URL}/products/categories`, revalidateSeconds);
}

export async function searchProducts(query: string, revalidateSeconds = 60): Promise<IProduct[]> {
  const all = await getAllProducts(revalidateSeconds);
  const lower = query.toLowerCase();
  return all.filter(
    (p) =>
      p.title.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower)
  );
}
