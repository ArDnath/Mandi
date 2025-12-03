'use client';
import Image from "next/image";
import { Search, ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import { useScrollPosition } from "@/hooks/useScrollPosition.ts";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { logout } from "@/lib/auth-actions";

const links = [
  { id: 1, label: "Home" ,href:"/"},
  { id: 2, label: "Features", href:"/features"},
  { id: 4, label: "Contact", href:"/contacts" },
];

export default function DesktopNavbar({session}:{session:Session |null}) {
  const scrollPostion = useScrollPosition();
  const pathname = usePathname();

 

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
          <div className="text-neutral-900 hover:text-neutral-500 transition"><Heart size={20} /></div>
          <div className="text-neutral-900 hover:text-neutral-500 transition"><ShoppingCart size={20} /></div>
          <button className="text-neutral-900 hover:text-neutral-500 transition"><Search size={20} /></button>
        </div>
      </div>
    </nav>
  );
}
