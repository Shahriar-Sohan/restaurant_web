"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CartButton } from "@/components/cart-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react";

export function NavigationBar() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Menu", link: "/menu" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ]

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed z-50 w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-2">
            <div className="sticky flex items-center gap-2">
              <CartButton />
            <ThemeToggle />
            </div>
            
            {user ?  (<>
            <NavbarButton variant="primary" onClick={() => signOut()}>Sign Out</NavbarButton>
            </>) : (<>
            <NavbarButton variant="secondary" onClick={() => router.push("/login")} >Login</NavbarButton>
            <NavbarButton variant="primary" onClick={() => router.push("/signup")}>Sign Up</NavbarButton>
           </>) }
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}


            <div className="flex w-full flex-col gap-4">
              <NavbarButton>
                <CartButton />
              </NavbarButton>
              <NavbarButton>
                <ThemeToggle />
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Sign Up
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </div>
  );
}
