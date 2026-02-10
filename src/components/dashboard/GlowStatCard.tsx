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
        return "bg-gradient-to-br from-eco-primary-300 via-eco-primary-400 to-eco-primary-500 text-white";
      case "pink":
        return "bg-white border border-eco-primary-100";
      case "yellow":
        return "bg-white border border-eco-secondary-100";
      default:
        return "bg-white border border-eco-neutral-100";
    }
  };

  const getIconBg = () => {
    switch (variant) {
      case "gradient":
        return "bg-white/20 text-white backdrop-blur-sm";
      case "pink":
        return "bg-[#FFA1AD] text-[#A50036]";
      case "yellow":
        return "bg-eco-secondary-100 text-eco-secondary-600";
      default:
        return "bg-eco-neutral-100 text-eco-neutral-600";
    }
  };

  return (
    <FadeIn>
      <div
        className={`${getVariantStyles()} relative overflow-hidden rounded-3xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
      >
        {/* Icon */}
        <div
          className={`${getIconBg()} mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform hover:scale-110`}
        >
          <div className="h-7 w-7 [&>svg]:h-full [&>svg]:w-full">{icon}</div>
        </div>

        {/* Title */}
        <p
          className={`${variant === "gradient" ? "text-white/90" : "text-eco-neutral-500"} mb-2 text-sm font-medium`}
        >
          {title}
        </p>

        {/* Value */}
        <div className="mb-2 flex items-baseline gap-1">
          <AnimatedCounter
            value={value}
            decimals={decimals}
            className={`${variant === "gradient" ? "text-white" : "text-eco-neutral-900"} text-4xl font-bold tracking-tight`}
          />
          {suffix && (
            <span
              className={`${variant === "gradient" ? "text-white/90" : "text-eco-neutral-500"} ml-1 text-lg font-medium`}
            >
              {suffix}
            </span>
          )}
        </div>

        {/* Message */}
        {message && (
          <p
            className={`${variant === "gradient" ? "text-white/80" : "text-eco-primary-600"} mt-2 text-sm font-medium`}
          >
            {message}
          </p>
        )}

        {/* Decorative glow effect */}
        {variant === "gradient" && (
          <>
            <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/10 blur-3xl transition-opacity group-hover:opacity-75" />
            <div className="bg-eco-secondary-400/20 absolute -bottom-8 -left-8 h-24 w-24 rounded-full blur-2xl" />
          </>
        )}
      </div>
    </FadeIn>
  );
}
