"use client";
import Image from "next/image";

const links = [
  { id: 1, label: "Home" },
  { id: 2, label: "About" },
  { id: 3, label: "Contact" },
];

export default function Navbar() {
  return (
    <nav
      className="flex items-center justify-between max-w-7xl mx-auto border-b px-5"
      aria-label="Main navigation"
    >
      <ul className="flex space-x-4 list-none m-0 p-0">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.label.toLowerCase()}`}
              className="text-sm hover:underline"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center">
        <Image
          src="/logo.webp"
          alt="Site logo"
          width={120}
          height={120}
        />
      </div>

      <div className="flex space-x-4">
        <button className="px-3 py-1 rounded">Cart</button>
        <button className="px-3 py-1 rounded">Search</button>
      </div>
    </nav>
  );
}
