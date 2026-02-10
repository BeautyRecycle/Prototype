"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "~/components/ui/Button";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/scan", label: "Scan", icon: "📷" },
  { href: "/rewards", label: "Rewards", icon: "🎁" },
  { href: "/dashboard", label: "Map", icon: "🗺️" },
  { href: "/dashboard", label: "Brand", icon: "✨" },
] as const;

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-eco-neutral-200 sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <div className="bg-gradient-to-br from-eco-primary-400 to-eco-primary-600 flex h-10 w-10 items-center justify-center rounded-xl text-xl shadow-md">
            🌸
          </div>
          <div className="hidden sm:block">
            <div className="text-eco-primary-700 text-lg font-bold leading-tight">
              EcoGlow
            </div>
            <div className="text-eco-primary-500 text-xs font-medium">
              Sustainable Beauty Returns
            </div>
          </div>
        </Link>

        {/* Nav Links */}
        <SignedIn>
          <div className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? "bg-eco-primary-50 text-eco-primary-700"
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
