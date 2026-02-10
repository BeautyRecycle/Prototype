"use client";

import { formatDistanceToNow } from "date-fns";
import { FadeIn } from "~/components/animations/MotionPrimitives";
import { type Material } from "~/types/domain";
import { Flame, Recycle, Package } from "lucide-react";

interface ActivityCardProps {
  material: Material;
  itemName: string;
  createdAt: Date;
  pointsEarned: number;
}

/**
 * Activity card for Recent Activity section — shows scan history with icons and points.
 */
export function ActivityCard({
  material,
  itemName,
  createdAt,
  pointsEarned,
}: ActivityCardProps) {
  const getIcon = () => {
    const m = material.toUpperCase();
    if (m === "PET" || m === "HDPE" || m === "PLASTIC") {
      return <Flame className="h-6 w-6 fill-orange-500 text-orange-500" />; // Flame (filled) for plastic
    }
    if (
      m === "GLASS" ||
      m === "ALUMINUM" ||
      m === "METAL" ||
      m === "CARDBOARD" ||
      m === "PAPER"
    ) {
      return <Recycle className="h-6 w-6 text-emerald-600" />; // Green Recycle for others
    }
    return <Package className="text-eco-neutral-600 h-6 w-6" />;
  };

  const getIconBg = () => {
    const m = material.toUpperCase();
    if (m === "PET" || m === "HDPE" || m === "PLASTIC") {
      return "bg-amber-100"; // Yellow/Amber
    }
    if (
      m === "GLASS" ||
      m === "ALUMINUM" ||
      m === "CARDBOARD" ||
      m === "PAPER"
    ) {
      return "bg-pink-100"; // Pink
    }
    return "bg-eco-neutral-100";
  };

  const formatTimeAgo = (date: Date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return (
    <FadeIn>
      <div className="hover:bg-eco-primary-50 relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md active:scale-98">
        <div className="relative z-10 flex items-center justify-between">
          {/* Left: Icon and details */}
          <div className="flex items-center gap-4">
            <div
              className={`${getIconBg()} flex h-14 w-14 items-center justify-center rounded-2xl transition-colors`}
            >
              {getIcon()}
            </div>
            <div>
              <p className="text-eco-neutral-900 text-base font-bold">
                {itemName}
              </p>
              <p className="text-eco-neutral-500 text-xs font-medium tracking-wide uppercase">
                {formatTimeAgo(createdAt)}
              </p>
            </div>
          </div>

          {/* Right: Points */}
          <div className="text-eco-primary-600 text-lg font-bold">
            +{pointsEarned} pts
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
