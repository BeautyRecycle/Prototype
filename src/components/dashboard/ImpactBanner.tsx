"use client";

import { FadeIn } from "~/components/animations/MotionPrimitives";
import { Target } from "lucide-react";

interface ImpactBannerProps {
  co2SavedKg: number;
}

/**
 * Beautiful impact banner with gradient background showing CO₂ equivalency.
 */
export function ImpactBanner({ co2SavedKg }: ImpactBannerProps) {
  // Calculate km of driving equivalent (average car: ~0.12 kg CO₂/km)
  const kmEquivalent = Math.round(co2SavedKg / 0.12);

  if (co2SavedKg === 0) return null;

  return (
    <FadeIn>
      <div className="from-eco-primary-50 via-eco-secondary-50 to-eco-secondary-100 border-eco-primary-100/50 relative overflow-hidden rounded-3xl border bg-gradient-to-r p-8 shadow-sm">
        {/* Content */}
        <div className="relative z-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="text-eco-primary-600 ring-eco-primary-100 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-sm ring-1">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-eco-primary-900 text-lg font-bold tracking-tight">
              Your Beautiful Impact
            </h3>
          </div>
          <p className="text-eco-neutral-700 max-w-3xl text-base leading-relaxed">
            You&apos;ve helped reduce carbon emissions equivalent to driving{" "}
            <span className="text-eco-primary-700 text-lg font-extrabold">
              {kmEquivalent} km
            </span>{" "}
            less! Your contribution makes the world more beautiful inside and
            out 🌸
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-gradient-to-br from-white/40 to-white/10 blur-3xl" />
        <div className="bg-eco-primary-200/20 absolute -bottom-16 -left-16 h-48 w-48 rounded-full blur-3xl" />
      </div>
    </FadeIn>
  );
}
