'use client';
import Image from "next/image";
import { ShoppingCart, Heart, X, Search } from "lucide-react";
import SearchInput from "@/components/search/search-input";
import Link from "next/link";
import { useScrollPosition } from "@/hooks/useScrollPosition.ts";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { logout } from "@/lib/auth-actions";
import { useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useState, useEffect } from "react";
import CartModal from "@/components/cart/cart-modal";

const links = [
  { id: 1, label: "Home" ,href:"/"},
  { id: 2, label: "Products", href:"/products"},
  { id: 3, label: "Features", href:"/features"},
  { id: 4, label: "Contact", href:"/contacts" },
];

// Desktop Navbar Component
export default function DesktopNavbar() {
  const scrollPostion = useScrollPosition();
  const pathname = usePathname();
  const { data: session } = useSession();
  const cartItemCount = useCartStore((state) => state.getItemCount());
  const wishlistItems = useWishlistStore((state) => state.items);
  const [mounted, setMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

 

  return (
    <nav 
      className={cn(
        "hidden md:block sticky top-0 z-50 bg-white transition-all duration-400 ease-in-out", scrollPostion > 0 ? "shadow-2xl shadow-neutral-200" : "shadow-none"
      )}
      >
      <div 
      className={cn
        ("flex mx-auto items-center justify-between max-w-7xl px-12 text-neutral-800 transition-all duration-1000 ease-in", {
        'border-b border-neutral-300': scrollPostion <= 0,
        'border-b border-transparent transition duration-1000 ease-in-out': scrollPostion > 0
      })}
      >
        <div className="flex items-center gap-8">
          {links.map((link, idx) => (
            <Link
              href={link.href}
              key={idx}
              className="text-neutral-900 hover:text-neutral-500 transition"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link href="/">
          <Image
            src={"/logo.webp"}
            draggable={false}
            alt="Logo"
            width={96}
            height={96}
            className=""
          />
        </Link>

        <div className="flex items-center gap-6">
          {
            session ?(
              <>
              <button className="rounded-lg shadow-sm shadow-neutral-400  hover:shadow-neutral-500
            bg-neutral-800 text-neutral-200 px-4 py-2 hover:bg-neutral-700 hover:text-neutral-100 transition"
            onClick={logout}
            >logout
            </button>
              </>
            ):(
              <Link
          href={'/sign-in'}
            className="text-sm font-medium text-heading hover:underline"
          >
            <button className="rounded-lg shadow-sm shadow-neutral-400  hover:shadow-neutral-500
            bg-neutral-800 text-neutral-200 px-4 py-2 hover:bg-neutral-700 hover:text-neutral-100 transition">login
            </button>
          </Link>
            )
          }
          <Link href="/wishlist" className="relative text-neutral-900 hover:text-neutral-500 transition">
            <Heart size={20} />
            {mounted && wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          
          {/* Cart Icon with Badge */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative text-neutral-900 hover:text-neutral-500 transition"
          >
            <ShoppingCart size={20} />
            {mounted && cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-neutral-900 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
          
          <div className="w-64 hidden lg:block">
            <SearchInput className="w-full" />
          </div>
          <button 
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="lg:hidden text-neutral-900 hover:text-neutral-500 transition"
          >
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Search Products</h2>
            <button 
              onClick={() => setShowMobileSearch(false)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
          <SearchInput className="w-full" variant="mobile" />
        </div>
      )}
      
      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
}
