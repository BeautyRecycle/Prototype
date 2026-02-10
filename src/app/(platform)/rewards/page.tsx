"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { RewardCard } from "~/components/rewards/RewardCard";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "~/components/animations/MotionPrimitives";
import { AnimatedCounter } from "~/components/animations/AnimatedCounter";

export default function RewardsPage() {
  const [redeemingId, setRedeemingId] = useState<string | null>(null);

  const { data: rewards, isLoading: rewardsLoading } =
    api.rewards.list.useQuery();
  const { data: profile, isLoading: profileLoading } =
    api.user.getProfile.useQuery();
  const { data: myRedemptions } = api.rewards.getMyRedemptions.useQuery();

  const utils = api.useUtils();

  const redeemMutation = api.rewards.redeem.useMutation({
    onMutate: (vars) => setRedeemingId(vars.rewardId),
    onSuccess: async () => {
      await Promise.all([
        utils.user.getProfile.invalidate(),
        utils.rewards.list.invalidate(),
        utils.rewards.getMyRedemptions.invalidate(),
      ]);
    },
    onSettled: () => setRedeemingId(null),
  });

  const redeemedIds = new Set(myRedemptions?.map((r) => r.rewardId) ?? []);

  if (rewardsLoading || profileLoading) {
    return <RewardsSkeleton />;
  }

  return (
    <div>
      <FadeIn>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-eco-neutral-900 text-2xl font-bold">
              Eco Rewards
            </h1>
            <p className="text-eco-neutral-500 mt-1">
              Redeem your points for sustainable rewards
            </p>
          </div>
          <div className="text-right">
            <p className="text-eco-neutral-500 text-sm">Your balance</p>
            <div className="text-eco-points text-2xl font-bold">
              <AnimatedCounter
                value={profile?.totalPoints ?? 0}
                suffix=" pts"
              />
            </div>
          </div>
        </div>
      </FadeIn>

      <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rewards?.map((reward) => (
          <StaggerItem key={reward.id}>
            <RewardCard
              reward={reward}
              userPoints={profile?.totalPoints ?? 0}
              isRedeemed={redeemedIds.has(reward.id)}
              onRedeem={(id) => redeemMutation.mutate({ rewardId: id })}
              isRedeeming={redeemingId === reward.id}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {rewards?.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-eco-neutral-400 text-lg">
            No rewards available yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}

function RewardsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <div className="bg-eco-neutral-200 h-8 w-48 rounded" />
          <div className="bg-eco-neutral-100 mt-2 h-5 w-72 rounded" />
        </div>
        <div className="bg-eco-neutral-200 h-10 w-24 rounded" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-eco-neutral-100 h-72 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
