import React from 'react'
import { Container } from '@/components/container'
import  FilterBar  from '@/components/FilterBar'
import HeroSection from '@/components/Hero'
function Home() {
  return (

      <Container className='flex gap-2'>
        <aside className="hidden md:block w-72 lg:w-80">
        <FilterBar />
      </aside>
      <main className="flex-1 min-h-screen mt-12">
        <div className="pt-6 md:pt-8">
          <HeroSection />
        </div>

        <section className="mt-12">
        </section>
      </main>
       
      </Container>
  )
}

export default Home