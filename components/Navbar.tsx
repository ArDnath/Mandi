
'use client';
import DesktopNavbar from './DesktopNav';
import MobileNavbar from './MobileNav';

export default function Navbar() {
  return (
    <>
      <DesktopNavbar />
      {/* MobileNavbar itself is hidden on md+ and DesktopNavbar hidden on sm */}
      <MobileNavbar />
    </>

  );
}
