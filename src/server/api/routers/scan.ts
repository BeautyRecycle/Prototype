import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { classificationEngine } from "~/lib/classification-engine";
import { PackageIdSchema } from "~/types/domain";

export const scanRouter = createTRPCRouter({
  /**
   * Classify a package and record the scan.
   *
   * Flow:
   * 1. Validate packageId
   * 2. Ensure user exists in DB (upsert from Clerk)
   * 3. Run classification engine
   * 4. Persist scan record
   * 5. Increment user points
   * 6. Return classification result
   */
  classify: protectedProcedure
    .input(z.object({ packageId: PackageIdSchema }))
    .mutation(async ({ ctx, input }) => {
      // Run mock AI classification
      const result = classificationEngine.classify(input.packageId);

      // Persist scan and update user points atomically
      const [scan] = await ctx.db.$transaction([
        ctx.db.scan.create({
          data: {
            packageId: input.packageId,
            material: result.material,
            fate: result.fate,
            co2SavedKg: result.co2SavedKg,
            pointsEarned: result.pointsEarned,
            userId: ctx.userId,
          },
        }),
        ctx.db.user.update({
          where: { id: ctx.userId },
          data: {
            totalPoints: { increment: result.pointsEarned },
          },
        }),
      ]);

      return {
        scanId: scan.id,
        ...result,
      };
    }),

  /**
   * Get all scans for the current user, ordered by most recent.
   */
  getUserScans: protectedProcedure
    .input(
      z.object({
        limit: z.number().int().min(1).max(100).default(20),
        cursor: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const scans = await ctx.db.scan.findMany({
        where: { userId: ctx.userId },
        orderBy: { createdAt: "desc" },
        take: input.limit + 1,
        ...(input.cursor ? { cursor: { id: input.cursor }, skip: 1 } : {}),
      });

      let nextCursor: string | undefined;
      if (scans.length > input.limit) {
        const nextItem = scans.pop();
        nextCursor = nextItem?.id;
      }

      return { scans, nextCursor };
    }),
});
