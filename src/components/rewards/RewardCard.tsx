"use client";

import { Card } from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";

interface RewardCardProps {
  reward: {
    id: string;
    name: string;
    description: string;
    pointsCost: number;
    imageUrl: string;
    stock: number;
  };
  userPoints: number;
  isRedeemed: boolean;
  onRedeem: (rewardId: string) => void;
  isRedeeming: boolean;
}

/**
 * RewardCard — displays a single reward with redeem action and progress tracking.
 */
export function RewardCard({
  reward,
  userPoints,
  isRedeemed,
  onRedeem,
  isRedeeming,
}: RewardCardProps) {
  const canAfford = userPoints >= reward.pointsCost;
  const isAvailable = reward.stock > 0 && !isRedeemed;

  // Progress calculation
  const progress = Math.min((userPoints / reward.pointsCost) * 100, 100);
  const remainingPoints = Math.max(reward.pointsCost - userPoints, 0);

  return (
    <Card
      variant="elevated"
      padding="none"
      className="border-eco-neutral-100/60 flex h-full flex-col overflow-hidden bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex flex-row items-start gap-4 p-4">
        {/* Icon/Image Placeholder */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-3xl">
          {getRewardEmoji(reward.name)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-eco-neutral-900 truncate text-base font-bold">
              {reward.name}
            </h3>
            {isRedeemed && (
              <span className="rounded-full bg-pink-100 px-2 py-0.5 text-[10px] font-bold tracking-wider text-pink-700 uppercase">
                Claimed
              </span>
            )}
          </div>

          <p className="mt-0.5 text-xs font-medium text-pink-500">
            {reward.description}
          </p>

          <div className="mt-4 mb-1 flex items-end justify-between">
            <span className="text-eco-neutral-500 text-xs font-semibold">
              {Math.min(userPoints, reward.pointsCost)} / {reward.pointsCost}{" "}
              points
            </span>
            <span className="text-xs font-bold text-pink-500">
              {Math.round(progress)}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="bg-eco-neutral-200 h-2 w-full overflow-hidden rounded-full">
            <div
              className="h-full rounded-full bg-black transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-2 text-xs font-bold text-pink-500">
            {reward.pointsCost} pts
          </div>
        </div>
      </div>

      {/* Action - Only show if not redeemed, or show disabled state */}
      {!isRedeemed && (
        <div className="mt-auto px-4 pb-4">
          <Button
            variant={canAfford ? "primary" : "outline"}
            size="sm"
            className={`w-full ${!canAfford ? "text-eco-neutral-400 cursor-default justify-start border-none bg-transparent pl-0 font-normal hover:bg-transparent" : ""}`}
            onClick={() => canAfford && onRedeem(reward.id)}
            disabled={!isAvailable || isRedeeming || !canAfford}
            isLoading={isRedeeming}
          >
            {!canAfford ? `Need ${remainingPoints} more pts` : "Redeem Reward"}
          </Button>
        </div>
      )}
    </Card>
  );
}

function getRewardEmoji(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("bag") || lower.includes("tote")) return "👜";
  if (lower.includes("bottle") || lower.includes("water")) return "🧴";
  if (lower.includes("plant") || lower.includes("tree")) return "🌱";
  if (lower.includes("discount") || lower.includes("coupon")) return "🎫";
  if (lower.includes("coffee")) return "☕";
  if (lower.includes("brush") || lower.includes("beauty")) return "💄";
  if (lower.includes("soap") || lower.includes("bar")) return "🧼";
  return "🎁";
}
