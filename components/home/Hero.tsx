"use client"
import React from 'react';

function HeroSection() {
  return (
    <div className='w-full bg-neutral-100 py-24 flex items-center justify-center'>
      <div className='flex flex-col items-center text-center space-y-4 w-full'>
        <h1 className='text-3xl md:text-3xl font-bold'>New Style 2025</h1>
        <p className='text-5xl font-bold'>Free Shipping</p>
        <p className='text-gray-600 max-w-2xl px-4'>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout
        </p>
      </div>
    </div>
  );
}

export default HeroSection;