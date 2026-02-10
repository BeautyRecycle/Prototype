"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// 🔴 CRITICAL: GSAP must never run during SSR
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * GSAPProvider — wraps children with GSAP context for safe cleanup.
 *
 * All GSAP animations in child components should use `useGSAP` or `useEffect`.
 * This provider ensures proper cleanup when components unmount.
 */
export function GSAPProvider({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // SSR guard
  if (typeof window === "undefined") return <>{children}</>;

  return (
    <div ref={containerRef} className="contents">
      <GSAPContext container={containerRef}>{children}</GSAPContext>
    </div>
  );
}

function GSAPContext({
  children,
  container,
}: {
  children: ReactNode;
  container: React.RefObject<HTMLDivElement | null>;
}) {
  useGSAP(
    () => {
      // Global GSAP defaults for the eco theme
      gsap.defaults({
        ease: "power2.out",
        duration: 0.6,
      });
    },
    { scope: container },
  );

  return <>{children}</>;
}

/**
 * Utility: Create a scroll-triggered animation.
 * Use inside `useGSAP` or `useEffect` in client components.
 */
export function createScrollAnimation(
  element: gsap.TweenTarget,
  animation: gsap.TweenVars,
  triggerOptions?: ScrollTrigger.Vars,
) {
  return gsap.from(element, {
    ...animation,
    scrollTrigger: {
      trigger: element as Element,
      start: "top 85%",
      end: "bottom 15%",
      toggleActions: "play none none reverse",
      ...triggerOptions,
    },
  });
}
