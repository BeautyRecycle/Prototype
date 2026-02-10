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
 * RewardCard — displays a single reward with redeem action.
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

  return (
    <Card variant="elevated" padding="none" className="overflow-hidden">
      {/* Image */}
      <div className="from-eco-primary-100 to-eco-secondary-100 relative h-40 bg-gradient-to-br">
        <div className="flex h-full items-center justify-center text-5xl">
          {getRewardEmoji(reward.name)}
        </div>
        {isRedeemed && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="bg-eco-secondary-500 rounded-full px-4 py-1.5 text-sm font-bold text-white">
              ✓ Redeemed
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-eco-neutral-900 text-base font-semibold">
          {reward.name}
        </h3>
        <p className="text-eco-neutral-500 mt-1 text-sm">
          {reward.description}
        </p>

        {/* Points & Stock */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-eco-points flex items-center gap-1 text-sm font-bold">
            <span>⭐</span>
            {reward.pointsCost} pts
          </span>
          <span className="text-eco-neutral-400 text-xs">
            {reward.stock} left
          </span>
        </div>

        {/* Action */}
        <Button
          variant={isRedeemed ? "ghost" : canAfford ? "primary" : "outline"}
          size="md"
          className="mt-4 w-full"
          onClick={() => onRedeem(reward.id)}
          disabled={!isAvailable || !canAfford || isRedeeming}
          isLoading={isRedeeming}
        >
          {isRedeemed
            ? "Already Claimed"
            : !canAfford
              ? `Need ${reward.pointsCost - userPoints} more pts`
              : "Redeem Reward"}
        </Button>
      </div>
    </Card>
  );
}

function getRewardEmoji(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("bag") || lower.includes("tote")) return "🛍️";
  if (lower.includes("bottle") || lower.includes("water")) return "🧴";
  if (lower.includes("plant") || lower.includes("tree")) return "🌱";
  if (lower.includes("discount") || lower.includes("coupon")) return "🏷️";
  if (lower.includes("brush") || lower.includes("beauty")) return "💄";
  if (lower.includes("soap") || lower.includes("bar")) return "🧼";
  return "🎁";
}
