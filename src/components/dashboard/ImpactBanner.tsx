"use client";

import { FadeIn } from "~/components/animations/MotionPrimitives";

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
      <div className="bg-gradient-to-r from-eco-primary-100 via-eco-secondary-100 to-eco-secondary-200 relative overflow-hidden rounded-3xl p-8 shadow-lg">
        {/* Content */}
        <div className="relative z-10">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-3xl">🎯</span>
            <h3 className="text-eco-primary-900 text-xl font-bold">
              Your Beautiful Impact
            </h3>
          </div>
          <p className="text-eco-neutral-800 text-base leading-relaxed">
            You've helped reduce carbon emissions equivalent to driving{" "}
            <span className="text-eco-primary-700 font-bold">
              {kmEquivalent} km
            </span>{" "}
            less! Your contribution makes the world more beautiful inside and
            out 🌸
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-eco-primary-300/30 blur-2xl" />
      </div>
    </FadeIn>
  );
}
