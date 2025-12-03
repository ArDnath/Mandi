
'use client';
import DesktopNavbar from '@/components/layout/desktop-nav';
import MobileNavbar from '@/components/layout/mobile-nav'

import { Session } from "next-auth";

export default function Navbar({ session }: { session: Session | null }) {
  return (
    <>
      <DesktopNavbar session={session} />

      <MobileNavbar session={session} />
    </>

  );
}
