import React from 'react'
import { Container } from '@/components/container'
import  FilterBar  from '@/components/FilterBar'
import HeroSection from '@/components/Hero';
import { getAllProducts } from '@/lib/api/fakestore';
import { IProduct } from '@/lib/api/types';


async function Home() {


  
  const products: IProduct[] =await getAllProducts()
  return (

      <Container className='flex gap-2'>
        <aside className="hidden md:block w-72 lg:w-80">
        <FilterBar />
      </aside>
      <main className="flex-1 min-h-screen mt-12">
        <div className="pt-6 md:pt-8">
          <HeroSection />
        </div>

        <div>
          <h2 className="mt-12 w-36 p-2 px-4  bg-neutral-100">show sidebar</h2>
        </div>

        <section className="mt-4  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <article
            key={product.id}
            className=" hover:shadow-md transition"
          >
            <div className="aspect-4/5 mb-3 flex items-center justify-center bg-neutral-100">
              <img
                src={product.image}
                alt={product.title}
                className="h-full p-16 object-contain"
              />
            </div>

            <div className="flex flex-col items-center text-center mt-2">
              <h2 className="text-sm font-medium text-neutral-800 line-clamp-2 mb-1">
                {product.title}
              </h2>

              <p className="text-lg font-semibold text-neutral-900 tracking-tight">
                ${product.price}
              </p>
            </div>

            
          </article>
          ))}
        </section>
      </main>
       
      </Container>
  )
}

export default Home