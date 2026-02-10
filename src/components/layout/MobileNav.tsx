"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, ScanLine, Gift, MapPin, Sparkles } from "lucide-react";
import { cn } from "~/lib/utils";

// Duplicate of NAV_LINKS from Navbar.tsx to ensure consistency
// In a larger app, this should be in a shared config file.
const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/scan", label: "Scan", icon: ScanLine },
  { href: "/rewards", label: "Rewards", icon: Gift },
  { href: "/map", label: "Map", icon: MapPin },
  { href: "/brand", label: "Brand", icon: Sparkles },
] as const;

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full md:hidden">
      {/* Glassmorphism Container */}
      <nav className="border-eco-neutral-200 pb-safe block border-t bg-white/80 px-2 pt-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
        <div className="flex items-center justify-around">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative flex flex-1 flex-col items-center justify-center py-3 outline-none"
              >
                {/* Active Indicator Background */}
                {isActive && (
                  <motion.div
                    layoutId="mobileEnvActive"
                    className="bg-eco-primary-50 absolute inset-x-2 top-1 bottom-1 -z-10 rounded-xl"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}

                {/* Icon with animation */}
                <motion.div
                  className={cn(
                    "relative",
                    isActive ? "text-eco-primary-600" : "text-eco-neutral-400",
                  )}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    y: isActive ? -2 : 0,
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon
                    strokeWidth={isActive ? 2.5 : 2}
                    className="h-6 w-6 transition-colors duration-200"
                  />

                  {/* Subtle Glow for Active Icon */}
                  {isActive && (
                    <motion.div
                      layoutId="iconGlow"
                      className="bg-eco-primary-400/20 absolute -inset-2 rounded-full blur-md"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </motion.div>

                {/* Label */}
                <span
                  className={cn(
                    "mt-1 text-[10px] font-medium transition-colors duration-200",
                    isActive ? "text-eco-primary-700" : "text-eco-neutral-500",
                  )}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
