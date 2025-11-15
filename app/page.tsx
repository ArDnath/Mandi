import React from 'react'
import { Container } from '@/components/container'
import Hero from '@/components/Hero'
import FilterBar from '@/components/FilterBar'

function Home() {
  return (
<<<<<<< Updated upstream
    <Container className='flex items-center justify-center h-screen'>
      <ApiResolve/>
    </Container>
=======
      <Container className='flex gap-2'>
        <FilterBar/>

        <Hero/>

      </Container>
>>>>>>> Stashed changes
  )
}

export default Home