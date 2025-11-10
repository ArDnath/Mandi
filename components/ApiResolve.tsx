"use client";

import { useEffect, useState } from "react";

interface Rating{
  rate?: number;
  count?: number;
}

interface Product{
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?:Rating;
}

export default function ApiResolve() {

  const [products, setProducts]= useState<Product[]|null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string |null>(null);


  useEffect(()=>{
    
    const LoadProducts = async () =>{
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("https://fakestoreapi.com/products")
        if(!res.ok){
          throw new Error(`Response status: ${res.status}`);

        }

        const result = await res.json() as Product[];
        console.log(result)
        setProducts(result);
        setLoading(false);
      } catch (error) {
        setError(error as string);
      }
    }

    LoadProducts();

  },[])


  
  
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className=" p-8 max-w-4xl mx-auto">
      {products?.map((product) => (
        <div key={product.id} className="mb-4 p-4 border rounded">
          <h3 className="font-bold">{product.title}</h3>
          <p>Category: {product.category}</p>
        </div>
      ))}
    </div>
  );
}
