import { IProduct } from "./types";

const Base_Url= "https://fakestoreapi.com";

async function fetchJSON<T>(url:string):Promise<T>{
    const res = await fetch(url,{
        cache: "no-store",
    });
    

    if(!res.ok){
        throw new Error(`Request failed : ${res.status}`);
    }

    return res.json();
}


export async function getAllProducts(): Promise<IProduct[]>{
    return fetchJSON<IProduct[]>(`${Base_Url}/products`);
}

export async function getProductById(id: number): Promise<IProduct> {
    return fetchJSON<IProduct>(`${Base_Url}/products/${id}`);
}

export async function getProductsByCategory(category: string): Promise<IProduct[]> {
    return fetchJSON<IProduct[]>(`${Base_Url}/products/category/${category}`);
}

export async function getAllCategories(): Promise<string[]> {
    return fetchJSON<string[]>(`${Base_Url}/products/categories`);
}