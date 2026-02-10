"use client";

import { formatDistanceToNow } from "date-fns";
import { FadeIn } from "~/components/animations/MotionPrimitives";
import { type Material } from "~/types/domain";
import { Flame, Recycle, Package, Box } from "lucide-react";

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
      return <Flame className="h-6 w-6 text-eco-secondary-600" />; // Flame for plastic (energy recovery)
    }
    if (m === "GLASS") {
      return <Recycle className="h-6 w-6 text-eco-primary-600" />; // Recycle for glass
    }
    if (m === "ALUMINUM" || m === "METAL") {
      return <Recycle className="h-6 w-6 text-eco-primary-600" />; // Recycle for metal
    }
    return <Package className="h-6 w-6 text-eco-neutral-600" />;
  };

  const getIconBg = () => {
    const m = material.toUpperCase();
    if (m === "PET" || m === "HDPE" || m === "PLASTIC") {
      return "bg-eco-secondary-100"; // Yellow for plastic
    }
    if (m === "GLASS" || m === "ALUMINUM") {
      return "bg-eco-primary-100"; // Pink for recyclables
    }
    return "bg-eco-neutral-100";
  };

  const formatTimeAgo = (date: Date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return (
    <FadeIn>
      <div className="bg-white hover:bg-eco-primary-50 active:scale-98 relative overflow-hidden rounded-2xl p-5 shadow-sm transition-all duration-200 hover:shadow-md">
        <div className="flex items-center justify-between relative z-10">
          {/* Left: Icon and details */}
          <div className="flex items-center gap-4">
            <div
              className={`${getIconBg()} flex h-14 w-14 items-center justify-center rounded-2xl transition-colors`}
            >
              {getIcon()}
            </div>
            <div>
              <p className="text-eco-neutral-900 font-bold text-base">{itemName}</p>
              <p className="text-eco-neutral-500 text-xs font-medium uppercase tracking-wide">
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
