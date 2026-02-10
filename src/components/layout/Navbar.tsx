"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "~/components/ui/Button";

const NAV_LINKS = [
  { href: "/scan", label: "Scan", icon: "📷" },
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/rewards", label: "Rewards", icon: "🎁" },
] as const;

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-eco-neutral-200 sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-eco-primary-700 flex items-center gap-2 text-lg font-bold"
        >
          <span className="text-2xl" aria-hidden="true">
            ♻️
          </span>
          <span className="hidden sm:inline">Eco Beauty</span>
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
