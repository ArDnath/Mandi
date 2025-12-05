import { IProduct } from "./types";

const Base_Url = "https://fakestoreapi.com";

async function fetchJSON<T>(url: string): Promise<T> {
    console.log(`[API] Starting fetch from: ${url}`);
    try {
        const res = await fetch(url, {
            cache: "no-store",
            next: { revalidate: 0 },
        });

        console.log(`[API] Response status: ${res.status} ${res.statusText}`);

        if (!res.ok) {
            console.error(`[API] Request failed for ${url}: ${res.status} ${res.statusText}`);
            throw new Error(`Fake Store API request failed: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        console.log(`[API] Successfully fetched data from ${url}`);
        return data;
    } catch (error) {
        console.error(`[API] Error fetching from ${url}:`, error);
        throw error;
    }
}


export async function getAllProducts(): Promise<IProduct[]> {
    console.log('[API] getAllProducts() called');
    return fetchJSON<IProduct[]>(`${Base_Url}/products`);
}

export async function getProductById(id: number): Promise<IProduct> {
    console.log(`[API] getProductById(${id}) called`);
    return fetchJSON<IProduct>(`${Base_Url}/products/${id}`);
}

export async function getProductsByCategory(category: string): Promise<IProduct[]> {
    console.log(`[API] getProductsByCategory(${category}) called`);
    return fetchJSON<IProduct[]>(`${Base_Url}/products/category/${category}`);
}

export async function getAllCategories(): Promise<string[]> {
    console.log('[API] getAllCategories() called');
    return fetchJSON<string[]>(`${Base_Url}/products/categories`);
}

export async function searchProducts(query: string): Promise<IProduct[]> {
    console.log(`[API] searchProducts("${query}") called`);
    const allProducts = await getAllProducts();
    const lowerQuery = query.toLowerCase();
    
    const results = allProducts.filter(product => 
        product.title.toLowerCase().includes(lowerQuery) || 
        product.description.toLowerCase().includes(lowerQuery)
    );
    console.log(`[API] searchProducts found ${results.length} results`);
    return results;
}