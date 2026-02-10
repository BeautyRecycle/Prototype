import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const rewardsRouter = createTRPCRouter({
  /**
   * List all active rewards.
   * Public so landing page can preview rewards.
   */
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.reward.findMany({
      where: { isActive: true, stock: { gt: 0 } },
      orderBy: { pointsCost: "asc" },
    });
  }),

  /**
   * Redeem a reward.
   *
   * Validates:
   * 1. User has enough points
   * 2. Reward exists and is in stock
   * 3. User hasn't already redeemed this reward (@@unique constraint)
   *
   * Uses a transaction for atomicity.
   */
  redeem: protectedProcedure
    .input(z.object({ rewardId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // Fetch user and reward in parallel
      const [user, reward] = await Promise.all([
        ctx.db.user.findUnique({
          where: { id: ctx.userId },
          select: { totalPoints: true },
        }),
        ctx.db.reward.findUnique({
          where: { id: input.rewardId },
        }),
      ]);

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found.",
        });
      }

      if (!reward?.isActive) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Reward not found or no longer available.",
        });
      }

      if (reward.stock <= 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "This reward is out of stock.",
        });
      }

      if (user.totalPoints < reward.pointsCost) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Not enough points. You have ${user.totalPoints} but need ${reward.pointsCost}.`,
        });
      }

      // Check for duplicate redemption
      const existing = await ctx.db.redemption.findUnique({
        where: {
          userId_rewardId: {
            userId: ctx.userId,
            rewardId: input.rewardId,
          },
        },
      });

      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "You have already redeemed this reward.",
        });
      }

      // Atomic: create redemption, deduct points, decrement stock
      const [redemption] = await ctx.db.$transaction([
        ctx.db.redemption.create({
          data: {
            userId: ctx.userId,
            rewardId: input.rewardId,
          },
        }),
        ctx.db.user.update({
          where: { id: ctx.userId },
          data: {
            totalPoints: { decrement: reward.pointsCost },
          },
        }),
        ctx.db.reward.update({
          where: { id: input.rewardId },
          data: {
            stock: { decrement: 1 },
          },
        }),
      ]);

      return {
        redemptionId: redemption.id,
        rewardName: reward.name,
        pointsSpent: reward.pointsCost,
        remainingPoints: user.totalPoints - reward.pointsCost,
      };
    }),

  /**
   * Get all redemptions for the current user.
   */
  getMyRedemptions: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.redemption.findMany({
      where: { userId: ctx.userId },
      include: { reward: true },
      orderBy: { createdAt: "desc" },
    });
  }),
});
