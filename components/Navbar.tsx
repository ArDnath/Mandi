"use client";
import Image from "next/image";
import { Search, ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";

const links = [
  { id: 1, label: "Home" ,href:"/"},
  { id: 2, label: "Features", href:"/features"},
  { id: 3, label: "blogs", href:"/blogs" },
  { id: 4, label: "Contact", href:"/contacts" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white flex flex-nowrap items-center justify-between border-b border-neutral-300 px-5">
      <div
      className="flex items-center gap-4" 
      >
        {links.map((link,idx)=>(
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

      <div className="flex  items-center gap-6">
        <button className="text-neutral-900 hover:text-neutral-500 transition">login</button>
        <div className="text-neutral-900 hover:text-neutral-500 transition"><Heart/></div>
        <div className="text-neutral-900 hover:text-neutral-500 transition"><ShoppingCart/></div>
        <button className="text-neutral-900 hover:text-neutral-500 transition"><Search/></button>
      </div>

    </nav>
  );
}
