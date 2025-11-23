'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const categories = [
  {
    id: 'electronics',
    title: 'Electronics',
    items: ['Smartphones', 'Laptops', 'Storage Devices', 'Monitors', 'Gaming'],
  },
  {
    id: 'jewelery',
    title: 'Jewelery',
    items: ['Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Gold', 'Silver'],
  },
  {
    id: 'mens-clothing',
    title: "Men's Clothing",
    items: ['T-Shirts', 'Casual Shirts', 'Jackets', 'Jeans', 'Slim Fit'],
  },
  {
    id: 'womens-clothing',
    title: "Women's Clothing",
    items: ['Dresses', 'Tops', 'Jackets', 'Casual Wear', 'T-Shirts'],
  },
];

const manufacturers = [
  'Fjallraven',
  'John Hardy',
  'WD (Western Digital)',
  'SanDisk',
  'Silicon Power',
  'Acer',
  'Samsung',
];

export default function FilterBar() {
  // Only first two categories are open by default
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const sections: Record<string, boolean> = {};
    categories.forEach((cat, index) => {
      sections[cat.id] = index < 2; // First two categories are open
    });
    return sections;
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>('0');
  const [maxPrice, setMaxPrice] = useState<string>('1000');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleSection = (id: string) =>
    setOpenSections((s) => ({ ...s, [id]: !s[id] }));

  const toggleCategory = (catId: string, item: string) => {
    const key = `${catId}-${item}`;
    setSelectedCategories((prev) =>
      prev.includes(key) ? [] : [key] // Only keep the newly selected item or clear if clicking the same item
    );
  };

  const toggleManufacturer = (manufacturer: string) => {
    setSelectedManufacturers((prev) =>
      prev.includes(manufacturer)
        ? prev.filter((m) => m !== manufacturer)
        : [...prev, manufacturer]
    );
  };

  return (
    <nav
      aria-label="Shop filters"
      className="h-screen md:sticky md:top-16 w-full md:w-80  text-neutral-700 overflow-y-auto scrollbar-hide "
    >
      <div className="h-full mt-6 px-5 py-6">
        <div className='mb-6'>
          Home / <span className='font-bold'>Electronics</span>
        </div>
        <header className="mb-6 space-y-3">
          <h1 className="text-2xl font-bold tracking-wider">CATEGORIES</h1>
          <div className='border-2 border-neutral-900 w-8 rounded-2xl'></div>
        </header>

        {/* Category accordion */}
        <div className="space-y-6">
          {categories.map((cat) => {
            const isOpen = !!openSections[cat.id];
            return (
              <section key={cat.id} aria-labelledby={`${cat.id}-label`}>
                <div className="flex items-center justify-between border-b-2 border-neutral-200">
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
                      className={`transform transition-transform duration-200 ${
                        isOpen ? '-rotate-180' : 'rotate-0'
                      }`}
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
                    {cat.items.map((it) => {
                      const itemKey = `${cat.id}-${it}`;
                      const isSelected = selectedCategories.includes(itemKey);

                      return (
                        <li key={it}>
                          <button
                            type="button"
                            onClick={() => toggleCategory(cat.id, it)}
                            className={`w-full text-left py-2 px-3 text-sm rounded-md transition-colors ${
                              isSelected
                                ? 'bg-neutral-200 text-black font-medium'
                                : 'text-neutral-800 hover:bg-neutral-100'
                            }`}
                          >
                            <span className="inline-block align-middle">{it}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </section>
            );
          })}
        </div>

        <div className="mb-6 mt-2 space-y-3">
          <h1 className="text-2xl font-bold tracking-wider">SHOP BY</h1>
          <div className='border-2 border-neutral-900 w-8 rounded-2xl'></div>
        </div>

        {/* Shop By Filters */}
        <div className="mt-8 space-y-6">
          {/* Manufacturer Section */}
          <div className="pb-6 border-b-2 border-neutral-200">
            <h3 className="text-base font-semibold text-neutral-800 mb-3">
              Manufacturer
            </h3>
            <div className="max-h-48 overflow-y-auto">
              {manufacturers.map((manufacturer) => {
                const isSelected = selectedManufacturers.includes(manufacturer);
                return (
                  <label
                    key={manufacturer}
                    className="flex items-center space-x-3 cursor-pointer hover:bg-neutral-50 p-2 rounded-lg transition"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleManufacturer(manufacturer)}
                      className="w-4 h-4 rounded border-neutral-300 text-neutral-800 focus:ring-2 focus:ring-neutral-300"
                    />
                    <span className="text-sm text-neutral-700">{manufacturer}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Price Range with Dual Slider */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Price Range
            </label>
            <div className="relative pt-2 pb-6">
              {/* Track */}
              <div className="relative h-2 bg-neutral-200 rounded-lg">
                {/* Active range */}
                <div
                  className="absolute h-2 bg-neutral-800 rounded-lg"
                  style={{
                    left: `${(Number(minPrice) / 1000) * 100}%`,
                    right: `${100 - (Number(maxPrice) / 1000) * 100}%`,
                  }}
                />
              </div>

              {/* Min slider */}
              <input
                type="range"
                min="0"
                max="1000"
                value={minPrice}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value <= Number(maxPrice)) {
                    setMinPrice(e.target.value);
                  }
                }}
                className="absolute w-full h-2 top-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neutral-800 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-neutral-800 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
              />

              {/* Max slider */}
              <input
                type="range"
                min="0"
                max="1000"
                value={maxPrice}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value >= Number(minPrice)) {
                    setMaxPrice(e.target.value);
                  }
                }}
                className="absolute w-full h-2 top-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neutral-800 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-neutral-800 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
              />
            </div>

            {/* Price labels */}
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-neutral-800 bg-neutral-100 px-3 py-1 rounded-md">
                ${minPrice}
              </span>
              <span className="text-neutral-400">—</span>
              <span className="text-sm font-medium text-neutral-800 bg-neutral-100 px-3 py-1 rounded-md">
                ${maxPrice}
              </span>
            </div>
          </div>

        
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Customer Rating
            </label>
            <div className="flex gap-2 flex-wrap">
              {[5, 4, 3, 2, 1].map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRating(selectedRating === r ? null : r)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-300 ${
                    selectedRating === r
                      ? 'bg-neutral-800 text-white'
                      : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
                  }`}
                >
                  {r}+ ★
                </button>
              ))}
            </div>
          </div>
          </div>
      </div>
    </nav>
  );
}