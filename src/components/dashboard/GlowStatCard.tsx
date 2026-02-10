"use client";

import { AnimatedCounter } from "~/components/animations/AnimatedCounter";
import { FadeIn } from "~/components/animations/MotionPrimitives";

interface GlowStatCardProps {
  title: string;
  value: number;
  suffix?: string;
  decimals?: number;
  icon: React.ReactNode;
  variant?: "gradient" | "pink" | "yellow";
  message?: string;
}

/**
 * EcoGlow-themed stat card with gradient backgrounds and playful messaging.
 */
export function GlowStatCard({
  title,
  value,
  suffix = "",
  decimals = 0,
  icon,
  variant = "gradient",
  message,
}: GlowStatCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "gradient":
        return "bg-gradient-to-br from-eco-primary-200 via-eco-primary-300 to-eco-primary-400";
      case "pink":
        return "bg-eco-primary-100";
      case "yellow":
        return "bg-eco-secondary-100";
      default:
        return "bg-eco-neutral-100";
    }
  };

  const getIconBg = () => {
    switch (variant) {
      case "gradient":
        return "bg-white/60";
      case "pink":
        return "bg-eco-primary-200";
      case "yellow":
        return "bg-eco-secondary-200";
      default:
        return "bg-eco-neutral-200";
    }
  };

  return (
    <FadeIn>
      <div
        className={`${getVariantStyles()} relative overflow-hidden rounded-3xl p-6 shadow-lg transition-transform hover:scale-105`}
      >
        {/* Icon */}
        <div className={`${getIconBg()} mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl`}>
          <div className="text-eco-primary-700">{icon}</div>
        </div>

        {/* Title */}
        <p className="text-eco-primary-900 mb-1 text-sm font-medium opacity-80">
          {title}
        </p>

        {/* Value */}
        <div className="mb-3 flex items-baseline gap-1">
          <AnimatedCounter
            value={value}
            decimals={decimals}
            className="text-eco-primary-900 text-4xl font-bold"
          />
          {suffix && (
            <span className="text-eco-primary-800 text-2xl font-semibold">
              {suffix}
            </span>
          )}
        </div>

        {/* Message */}
        {message && (
          <p className="text-eco-primary-800 text-sm font-medium">{message}</p>
        )}

        {/* Decorative glow effect */}
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
      </div>
    </FadeIn>
  );
}
