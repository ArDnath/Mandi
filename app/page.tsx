import ApiResolve from '@/components/ApiResolve'
import { Container } from '@/components/container'
import React from 'react'

function Home() {
  return (
    <Container className='flex items-center justify-center h-screen'>
      <ApiResolve/>
    </Container>
  )
}

export default Home