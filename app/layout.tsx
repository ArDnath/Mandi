import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Banner from "@/components/layout/banner";


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Mandi",
  description: "E-commerce Catalog & Cart",
  openGraph:{
    title: "mandi",
    description: "E-commerce Catalog & Cart",
    url: "http://mandi.aryamn.space ",
    siteName: "mandi",
    images:[{
      url:"/og.png",
      width:1200,
      height:630,
      alt:"mandi"
    }],
    locale:"en-US",
    type:"website"
  },
  twitter:{
    card:"summary_large_image",
    title:"mandi",
    description:"E-commerce Catalog & Cart",
    images:["/og.png"]

  },
};

import { Providers } from "@/components/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        
        <Providers>
          <Banner />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
 