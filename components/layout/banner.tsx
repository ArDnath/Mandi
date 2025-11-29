'use client';

import React from 'react';

const items = [
  'NEW STYLE 2025',
  'FREE SHIPPING ON ORDERS OVER ₹1999',
  'BLACK COLLECTION',
  'SHOP THE LATEST TRENDS',
  'UP TO 50% OFF SELECTED',
];

export default function Banner() {
  return (
    <div className="w-full overflow-hidden bg-black text-white">
      <div className="flex items-center h-12 md:h-14">
        <div className="px-4 md:px-8 text-xs md:text-sm font-medium tracking-wider shrink-0">
           
        </div>

        <div className="flex-1 overflow-hidden relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-linear-to-r from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-linear-to-l from-black to-transparent z-10 pointer-events-none"></div>
          
          {/* Scrolling content */}
          <div className="flex animate-scroll">
            {/* Render items 3 times for seamless loop */}
            {Array.from({ length: 3 }).map((_, groupIndex) => (
              <div key={groupIndex} className="flex items-center shrink-0">
                {items.map((text, i) => (
                  <React.Fragment key={`${groupIndex}-${i}`}>
                    <span className="whitespace-nowrap text-sm md:text-base px-3">
                      {text}
                    </span>
                    <span className="text-white/50">•</span>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 md:px-8 text-xs md:text-sm font-medium tracking-wider shrink-0">
          <span className="inline-block rounded-full  px-3 py-1"></span>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }

        .animate-scroll {
          animation: scroll 25s linear infinite;
          display: flex;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}