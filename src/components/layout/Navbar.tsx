"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "~/components/ui/Button";
import { Home, ScanLine, Gift, MapPin, Sparkles, Menu } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: <Home className="h-4 w-4" /> },
  { href: "/scan", label: "Scan", icon: <ScanLine className="h-4 w-4" /> },
  { href: "/rewards", label: "Rewards", icon: <Gift className="h-4 w-4" /> },
  { href: "/map", label: "Map", icon: <MapPin className="h-4 w-4" /> },
  { href: "/brand", label: "Brand", icon: <Sparkles className="h-4 w-4" /> },
] as const;

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-eco-neutral-200 sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <div className="bg-gradient-to-br from-eco-primary-400 to-eco-primary-600 shadow-eco-primary-200/50 flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-lg transition-transform group-hover:scale-105">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="hidden sm:block">
            <div className="text-eco-primary-900 font-bold leading-tight">
              EcoGlow
            </div>
            <div className="text-eco-primary-500 text-[10px] font-medium tracking-wide uppercase">
              Sustainable Beauty Returns
            </div>
          </div>
        </Link>

        {/* Nav Links */}
        <SignedIn>
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-eco-primary-50 text-eco-primary-600 shadow-xs ring-1 ring-inset ring-eco-primary-100"
                      : "text-eco-neutral-600 hover:bg-eco-neutral-50 hover:text-eco-primary-600"
                  }`}
                >
                  <span className={isActive ? "text-eco-primary-500" : "text-eco-neutral-400 group-hover:text-eco-primary-500"}>
                    {link.icon}
                  </span>
                  {link.label}
                </Link>
              );
            })}
          </div>
          
          <div className="ml-4 border-l border-eco-neutral-200 pl-4">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9 ring-2 ring-eco-primary-100 transition-shadow hover:ring-eco-primary-300",
                }
              }}
            />
          </div>
        </SignedIn>

        <SignedOut>
          <div className="flex items-center gap-2">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm" className="bg-gradient-to-r from-eco-primary-500 to-eco-primary-600 text-white shadow-md hover:shadow-lg">
                Join EcoGlow
              </Button>
            </Link>
          </div>
        </SignedOut>
      </nav>
    </header>
  );
}                      ? "bg-eco-primary-50 text-eco-primary-700"
                      : "text-eco-neutral-600 hover:bg-eco-neutral-100 hover:text-eco-neutral-900"
                  } `}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span aria-hidden="true">{link.icon}</span>
                  <span className="hidden sm:inline">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </SignedIn>

        {/* Auth */}
        <div className="flex items-center gap-3">
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9",
                },
              }}
            />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <Button variant="primary" size="sm">
                Sign In
              </Button>
            </Link>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}
