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
import { CartButton } from "@/components/cart-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react";
import { HoverBorderGradient } from "./ui/border-gradient";

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

            {user ? (<>

              <NavbarButton variant="primary" onClick={() => signOut()}>Sign Out</NavbarButton>
            </>) : (<>
              <NavbarButton variant="secondary" onClick={() => router.push("/login")} >Login</NavbarButton>
              <HoverBorderGradient
                onClick={() => router.push("/signup")}
                containerClassName="rounded-md hover:scale-105 transition dark:bg-black/5 duration-300 hover:brightness-150"
                as="button"
                className="px-4 py-2 text-sm font-semibold text-white
             bg-gradient-to-r from-gray-900 via-blue-900 to-black
             hover:from-gray-800 hover:via-blue-800 hover:to-black
             dark:from-black dark:via-gray-900 dark:to-gray-800
             rounded-md shadow-md relative cursor-pointer
             transition-all duration-300 inline-flex items-center justify-center text-center hover:brightness-150 hover:via-blue-800 hover:to-gray-900"
              >
                Sign Up
              </HoverBorderGradient>

            </>)}
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
              <CartButton />


              <ThemeToggle />



              {user ? (

                <NavbarButton
                  onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                  variant="primary"
                  className="w-full"
                >
                  Sign Out
                </NavbarButton>
              ) : (
                <>
                  <NavbarButton
                    onClick={() => { router.push("/login"); setIsMobileMenuOpen(false); }}
                    variant="secondary"
                    className="w-full"
                  >
                    Login
                  </NavbarButton>

                  <NavbarButton
                    onClick={() => { router.push("/signup"); setIsMobileMenuOpen(false); }}
                    variant="primary"
                    className="w-full"
                  >
                    Sign Up
                  </NavbarButton>
                </>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </div>
  );
}
