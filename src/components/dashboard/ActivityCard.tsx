"use client";

import { FadeIn } from "~/components/animations/MotionPrimitives";
import { type Material } from "~/types/domain";

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
    switch (material) {
      case "plastic":
      case "pet":
      case "hdpe":
      case "pp":
        return "🔥"; // Flame for plastic (energy recovery)
      case "glass":
        return "♻️"; // Recycle for glass
      case "cardboard":
      case "paper":
        return "♻️"; // Recycle for cardboard
      case "aluminum":
      case "metal":
        return "♻️"; // Recycle for metal
      default:
        return "📦";
    }
  };

  const getIconBg = () => {
    switch (material) {
      case "plastic":
      case "pet":
      case "hdpe":
      case "pp":
        return "bg-eco-secondary-200"; // Yellow for plastic
      case "glass":
      case "cardboard":
      case "paper":
      case "aluminum":
      case "metal":
        return "bg-eco-primary-200"; // Pink for recyclables
      default:
        return "bg-eco-neutral-200";
    }
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
    const weeks = Math.floor(days / 7);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  };

  return (
    <FadeIn>
      <div className="bg-eco-neutral-50 rounded-2xl p-5 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          {/* Left: Icon and details */}
          <div className="flex items-center gap-4">
            <div
              className={`${getIconBg()} flex h-14 w-14 items-center justify-center rounded-full text-2xl`}
            >
              {getIcon()}
            </div>
            <div>
              <p className="text-eco-neutral-900 font-medium">{itemName}</p>
              <p className="text-eco-neutral-500 text-sm">
                {formatDistanceToNow(createdAt, { addSuffix: true })}
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
