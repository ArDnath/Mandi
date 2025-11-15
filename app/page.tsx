import React from 'react'
import { Container } from '@/components/container'
import  FilterBar  from '@/components/FilterBar'

function Home() {
  return (

      <Container className='flex gap-2'>
        <FilterBar/>
      </Container>
  )
}

export default Home