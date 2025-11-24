'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Search, ShoppingCart, Heart } from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  { id: 1, label: "Home", href: "/" },
  { id: 2, label: "Features", href: "/features" },
  { id: 4, label: "Contact", href: "/contacts" },
];

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <nav className="md:hidden sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            className="p-2 rounded-lg text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
          
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.webp" 
              alt="Logo" 
              width={70} 
              height={70} 
              draggable={false}
              priority
            />
          </Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-1">
          <button 
            aria-label="Favorites"
            className="p-2.5 rounded-lg text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400"
          >
            <Heart size={20} />
          </button>
          <button 
            aria-label="Shopping cart"
            className="p-2.5 rounded-lg text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 pb-3">
        <div className="flex items-center border border-neutral-300 rounded-xl overflow-hidden bg-neutral-50 focus-within:border-neutral-400 focus-within:bg-white transition-colors">
          <label htmlFor="mobile-search" className="sr-only">Search products</label>
          <input 
            id="mobile-search"
            type="search" 
            placeholder="Search products..." 
            className="flex-1 px-4 py-2.5 bg-transparent outline-none text-sm placeholder:text-neutral-500"
          />
          <button 
            aria-label="Search"
            className="px-4 py-2.5 hover:bg-neutral-200 active:bg-neutral-300 transition-colors"
          >
            <Search size={20} className="text-neutral-600" />
          </button>
        </div>
      </div>

      {/* Slide-in Menu */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/50 animate-in fade-in duration-300"
          />

          {/* Menu Panel */}
          <aside className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl animate-in slide-in-from-left duration-300">
            {/* Menu Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-200">
              <Link 
                href="/" 
                onClick={() => setOpen(false)} 
                className="flex items-center focus:outline-none focus:ring-2 focus:ring-neutral-400 rounded-lg"
              >
                <Image 
                  src="/logo.webp" 
                  alt="Logo" 
                  width={70} 
                  height={70} 
                  draggable={false}
                />
              </Link>
              <button 
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="p-2 rounded-lg hover:bg-neutral-100 active:bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400"
              >
                <X size={22} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="px-4 py-6">
              <ul className="flex flex-col gap-1">
                {links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.id}>
                      <Link 
                        href={link.href} 
                        onClick={() => setOpen(false)} 
                        className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 ${
                          isActive 
                            ? 'bg-neutral-900 text-white' 
                            : 'text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Account Section */}
            <div className="px-4 py-4 border-t border-neutral-200">
              <Link 
                href="/account" 
                onClick={() => setOpen(false)} 
                className="block py-3 px-4 text-center bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 active:bg-neutral-700 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400"
              >
                Login / Register
              </Link>
            </div>
          </aside>
        </div>
      )}
    </nav>
  );
}