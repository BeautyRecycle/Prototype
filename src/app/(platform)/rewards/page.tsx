"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { RewardCard } from "~/components/rewards/RewardCard";
import { PointsHero } from "~/components/rewards/PointsHero";
import { BonusBanner } from "~/components/rewards/BonusBanner";
import { EarnPointsSection } from "~/components/rewards/EarnPointsSection";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "~/components/animations/MotionPrimitives";

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
    <div className="mx-auto max-w-5xl pb-12">
      <FadeIn>
        <div className="mb-6">
          <h1 className="text-eco-primary-900 mb-2 text-3xl font-bold">
            Your Rewards
          </h1>
          <p className="font-medium text-pink-500">
            Redeem your points for gorgeous perks ✨
          </p>
        </div>
        <PointsHero points={profile?.totalPoints ?? 0} />
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="mt-8 mb-4">
          <h2 className="text-eco-primary-900 text-xl font-bold">
            Available Rewards
          </h2>
        </div>
      </FadeIn>

      <StaggerContainer
        delay={0.3}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2"
      >
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
        <div className="bg-eco-neutral-50 border-eco-neutral-200 mt-6 rounded-xl border border-dashed py-16 text-center">
          <p className="text-eco-neutral-400 text-lg">
            No rewards available yet. Check back soon!
          </p>
        </div>
      )}

      <FadeIn delay={0.4}>
        <BonusBanner />
      </FadeIn>

      <FadeIn delay={0.6}>
        <EarnPointsSection />
      </FadeIn>
    </div>
  );
}

function RewardsSkeleton() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse space-y-8">
      {/* Hero Skeleton */}
      <div className="bg-eco-neutral-200 h-64 rounded-2xl" />

      {/* Banner Skeleton */}
      <div className="bg-eco-neutral-100 h-24 rounded-xl" />

      {/* Grid Skeleton */}
      <div>
        <div className="bg-eco-neutral-200 mb-6 h-8 w-48 rounded" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-eco-neutral-100 h-48 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
