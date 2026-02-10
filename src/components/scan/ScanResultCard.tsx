"use client";

import { motion } from "framer-motion";
import type { ScanResult } from "~/types/domain";
import { AnimatedCounter } from "~/components/animations/AnimatedCounter";
import { Card } from "~/components/ui/Card";
import { MATERIAL_LABELS, FATE_LABELS } from "~/lib/constants";

interface ScanResultCardProps {
  result: ScanResult & { scanId: string };
  onScanAgain: () => void;
}

/**
 * ScanResultCard — animated card showing classification result.
 *
 * Displays material, fate, CO₂ saved, and points earned
 * with Framer Motion enter animation.
 */
export function ScanResultCard({ result, onScanAgain }: ScanResultCardProps) {
  const icoReuse = result.fate === "reuse";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
    >
      <Card variant="elevated" padding="lg" className="mx-auto max-w-md">
        {/* Fate Badge */}
        <div className="mb-4 flex justify-center">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${icoReuse ? "bg-eco-primary-100 text-eco-primary-700" : "bg-amber-100 text-amber-700"} `}
          >
            <span className="text-lg">{icoReuse ? "♻️" : "⚡"}</span>
            {FATE_LABELS[result.fate]}
          </span>
        </div>

        {/* Material */}
        <h3 className="text-eco-neutral-900 text-center text-xl font-bold">
          {MATERIAL_LABELS[result.material]}
        </h3>
        <p className="text-eco-neutral-500 mt-1 text-center text-sm">
          {result.classification}
        </p>

        {/* Impact Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-eco-secondary-50 rounded-xl p-4 text-center">
            <p className="text-eco-secondary-600 text-xs font-medium">
              CO₂ Saved
            </p>
            <div className="text-eco-secondary-700 mt-1 text-2xl font-bold">
              <AnimatedCounter
                value={result.co2SavedKg}
                suffix=" kg"
                decimals={2}
                duration={1}
              />
            </div>
          </div>

          <div className="rounded-xl bg-purple-50 p-4 text-center">
            <p className="text-eco-points text-xs font-medium">Points Earned</p>
            <div className="text-eco-points mt-1 text-2xl font-bold">
              <AnimatedCounter
                value={result.pointsEarned}
                prefix="+"
                duration={1}
              />
            </div>
          </div>
        </div>

        {/* Scan Again */}
        <button
          onClick={onScanAgain}
          className="bg-eco-primary-600 hover:bg-eco-primary-700 mt-6 w-full rounded-xl px-4 py-3 font-medium text-white transition-colors"
        >
          Scan Another Package
        </button>
      </Card>
    </motion.div>
  );
}
