'use client';

import React, { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';

const categories = [
  {
    id: 'furnitures',
    title: 'Furnitures',
    items: ['Chairs', 'Tables', 'Office', 'Storage', 'Stools & Benches'],
  },
  {
    id: 'chairs-sofas',
    title: 'Chairs & Sofas',
    items: ['Accent Chairs', 'Dining Chairs', 'Sofas', 'Sectionals', 'Recliners'],
  },
];

export default function FilterBar() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    furnitures: true,
    'chairs-sofas': true,
  });

  const toggleSection = (id: string) =>
    setOpenSections((s) => ({ ...s, [id]: !s[id] }));

  return (
    <nav
      aria-label="Shop filters"
      className="h-screen md:sticky md:top-16 w-full md:w-80 bg-white border-r border-neutral-200 text-neutral-700"
    >
      <div className="h-full px-5 py-6">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Narrow down results by category, price or brand.
          </p>
        </header>

        {/* Category accordion */}
        <div className="space-y-6">
          {categories.map((cat) => {
            const isOpen = !!openSections[cat.id];
            return (
              <section key={cat.id} aria-labelledby={`${cat.id}-label`}>
                <div className="flex items-center justify-between">
                  <h2
                    id={`${cat.id}-label`}
                    className="text-lg font-medium text-neutral-800"
                  >
                    {cat.title}
                  </h2>

                  <button
                    onClick={() => toggleSection(cat.id)}
                    aria-expanded={isOpen}
                    aria-controls={`${cat.id}-panel`}
                    className="p-2 rounded-md hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                  >
                    <ChevronDown
                      size={18}
                      className={`transform transition-transform duration-200 ${isOpen ? '-rotate-180' : 'rotate-0'}`}
                      aria-hidden
                    />
                    <span className="sr-only">{isOpen ? 'Collapse' : 'Expand'}</span>
                  </button>
                </div>

                <div
                  id={`${cat.id}-panel`}
                  className={`mt-3 overflow-hidden transition-[max-height,opacity] duration-300 ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  aria-hidden={!isOpen}
                >
                  <ul className="space-y-2 text-neutral-600">
                    {cat.items.map((it) => (
                      <li key={it}>
                        <button
                          type="button"
                          className="w-full text-left px-3 py-2 rounded-md hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-200 transition-colors duration-150"
                        >
                          <span className="inline-block align-middle">{it}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          })}
        </div>

        <div className="my-6">
          <h1 className="text-2xl font-semibold tracking-tight">Shop By</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Narrow down results by category, price or brand.
          </p>
        </div>

        {/* Quick actions */}
        <div className="mt-8  pt-6 space-y-4">
          {/* example subfilter header */}
          <div className="flex items-center justify-between ">
            <h3 className="text-base font-semibold">Manufracturer</h3>
          </div>

          {/* Example: price range inputs */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Price</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                placeholder="Min"
                className="w-1/2 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200"
              />
            </div>
          </div>

          {/* Example: ratings */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Rating</label>
            <div className="flex gap-2">
              {[4, 3, 2, 1].map((r) => (
                <button
                  key={r}
                  className="px-3 py-1 rounded-md text-sm bg-neutral-50 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                >
                  {r}+ ★
                </button>
              ))}
            </div>
          </div>

          {/* Apply / Clear */}
          <div className="flex gap-3">
            <button className="flex-1 py-2 rounded-md bg-neutral-900 text-white font-medium">
              Apply
            </button>
            <button className="flex-1 py-2 rounded-md border text-neutral-700">
              Clear
            </button>
          </div>
        </div>

        {/* Footer (user/account or small help) */}
        <div className="mt-6 pt-6 border-t border-neutral-100 text-sm text-neutral-500">
          <p>Showing filters only — results appear on the products list.</p>
        </div>
      </div>
    </nav>
  );
}
