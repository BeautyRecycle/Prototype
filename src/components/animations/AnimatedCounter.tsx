"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "~/hooks/use-reduced-motion";

interface AnimatedCounterProps {
  /** Target value to count up to */
  value: number;
  /** Duration of the animation in seconds */
  duration?: number;
  /** Number of decimal places */
  decimals?: number;
  /** Prefix text (e.g., "+", "$") */
  prefix?: string;
  /** Suffix text (e.g., "kg", "pts") */
  suffix?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * AnimatedCounter — GSAP-powered number count-up component.
 *
 * Uses gsap.to() with snap for integer effect.
 * Falls back to static number if user prefers reduced motion.
 */
export function AnimatedCounter({
  value,
  duration = 1.5,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const valueRef = useRef({ current: 0 });
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!counterRef.current) return;

    // If reduced motion, just show the value immediately
    if (prefersReduced) {
      counterRef.current.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(valueRef.current, {
        current: value,
        duration,
        ease: "power2.out",
        snap: decimals === 0 ? { current: 1 } : undefined,
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = `${prefix}${valueRef.current.current.toFixed(decimals)}${suffix}`;
          }
        },
      });
    });

    return () => ctx.revert();
  }, [value, duration, decimals, prefix, suffix, prefersReduced]);

  return (
    <span
      ref={counterRef}
      className={className}
      aria-live="polite"
      aria-label={`${prefix}${value.toFixed(decimals)}${suffix}`}
    >
      {prefix}0{suffix}
    </span>
  );
}
