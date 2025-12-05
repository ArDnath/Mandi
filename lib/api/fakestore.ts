import { IProduct } from "./types";

const Base_Url = "https://fakestoreapi.com";

import axios from "axios";

async function fetchJSON<T>(url: string): Promise<T> {
    console.log(`[API] Starting axios request to: ${url}`);
    try {
        const res = await axios.get<T>(url);

        console.log(`[API] Response status: ${res.status} ${res.statusText}`);

        console.log(`[API] Successfully fetched data from ${url}`);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
             console.error(`[API] Axios error fetching from ${url}:`, error.message, error.response?.status);
             throw new Error(`Fake Store API request failed: ${error.response?.status || 'Unknown'} ${error.message}`);
        }
        console.error(`[API] Unknown error fetching from ${url}:`, error);
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