"use client";

import { useState, useEffect } from "react";

/**
 * Detects if the user prefers reduced motion.
 *
 * Both Framer Motion and GSAP animations should check this
 * and either skip animations or show static content.
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mql.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener("change", handler);

    return () => mql.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}
