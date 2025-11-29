
'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <footer className="bg-neutral-primary-soft mt-16 sm:mt-28">
      <div className="mx-auto w-full max-w-7xl p-4 py-6 lg:py-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-0">
          <div className="mb-6 md:mb-0">
            <Link 
              href="/" 
              className="flex items-center" 
              onClick={handleScrollToTop}
            >
              <Image src="/logo.webp" alt="Logo" width={100} height={100}/>
            </Link>
            <p className="text-sm text-body font-light max-w-xs">
              Your neighbourhood online bazaar — fresh deals, trusted sellers, and
              everyday essentials in one place.
            </p>
          </div>

          
          <div className="grid grid-cols-2 gap-8 sm:gap-10 sm:grid-cols-3">
            <div >
              <h2 className="mb-6 text-sm font-semibold text-heading uppercase">
                Shop
              </h2>
              <ul className="text-body font-light  space-y-4">
                <li>
                  <Link href="/products" className="hover:underline">
                    All products
                  </Link>
                </li>
                
                <li>
                  <Link href="/categories/fashion" className="hover:underline">
                    Fashion &amp; lifestyle
                  </Link>
                </li>
                <li>
                  <Link href="/offers" className="hover:underline">
                    Today&apos;s deals
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold text-heading uppercase">
                Company
              </h2>
              <ul className="text-body font-light  space-y-4">
                <li>
                  <Link href="/about" className="hover:underline">
                    About Mandi
                  </Link>
                </li>
                <li>
                  <Link href="/seller" className="hover:underline">
                    Become a seller
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:underline">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:underline">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold text-heading uppercase">
                Support
              </h2>
              <ul className="text-body font-light  space-y-4">
                <li>
                  <Link href="/help" className="hover:underline">
                    Help center
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:underline">
                    Shipping &amp; delivery
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:underline">
                    Returns &amp; refunds
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:underline">
                    Privacy policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>


        <hr className="my-6 sm:mx-auto lg:my-8" />

        
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-body sm:text-center">
            © {new Date().getFullYear()}{" "}
            <Link 
              href="/" 
              className="hover:underline"
              onClick={handleScrollToTop}
            >
              Mandi
            </Link>
            . All rights reserved.
          </span>

          <div className="flex mt-4 sm:justify-center sm:mt-0 gap-5">
            {/* GitHub */}
            <Link
              href="https://github.com/ArDnath"
              className="text-body hover:text-heading"
              aria-label="GitHub"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>

            {/* Twitter / X placeholder */}
            <Link
              href="#"
              className="text-body hover:text-heading"
              aria-label="Twitter"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Z" />
              </svg>
            </Link>

            {/* Instagram placeholder */}
            <Link
              href="#"
              className="text-body hover:text-heading"
              aria-label="Instagram"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-2.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
