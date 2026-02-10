import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  /**
   * Get the current user's profile.
   *
   * The enforceAuth middleware guarantees the user row already exists
   * in our DB (lazy upsert on every protected call), so a simple
   * findUnique is sufficient here.
   */
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.userId },
    });

    return user;
  }),

  /**
   * Get aggregated impact statistics for the current user.
   *
   * Returns: total CO₂ saved, total scans, points balance,
   * breakdown by material, and breakdown by fate.
   */
  getImpactStats: protectedProcedure.query(async ({ ctx }) => {
    const [aggregates, scansByMaterial, scansByFate, user] = await Promise.all([
      // Total CO₂ and scan count
      ctx.db.scan.aggregate({
        where: { userId: ctx.userId },
        _sum: { co2SavedKg: true, pointsEarned: true },
        _count: true,
      }),

      // Breakdown by material
      ctx.db.scan.groupBy({
        by: ["material"],
        where: { userId: ctx.userId },
        _count: true,
        _sum: { co2SavedKg: true },
      }),

      // Breakdown by fate
      ctx.db.scan.groupBy({
        by: ["fate"],
        where: { userId: ctx.userId },
        _count: true,
        _sum: { co2SavedKg: true },
      }),

      // Current user points
      ctx.db.user.findUnique({
        where: { id: ctx.userId },
        select: { totalPoints: true },
      }),
    ]);

    return {
      totalPoints: user?.totalPoints ?? 0,
      totalScans: aggregates._count,
      totalCo2SavedKg: aggregates._sum.co2SavedKg ?? 0,
      totalPointsEarned: aggregates._sum.pointsEarned ?? 0,
      scansByMaterial: scansByMaterial.map((m) => ({
        material: m.material,
        count: m._count,
        co2SavedKg: m._sum.co2SavedKg ?? 0,
      })),
      scansByFate: scansByFate.map((f) => ({
        fate: f.fate,
        count: f._count,
        co2SavedKg: f._sum.co2SavedKg ?? 0,
      })),
    };
  }),
});
