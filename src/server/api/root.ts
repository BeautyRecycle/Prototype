import { scanRouter } from "~/server/api/routers/scan";
import { userRouter } from "~/server/api/routers/user";
import { rewardsRouter } from "~/server/api/routers/rewards";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for the Eco Beauty Circular API.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  scan: scanRouter,
  user: userRouter,
  rewards: rewardsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.scan.classify({ packageId: "QR_PET_001" });
 */
export const createCaller = createCallerFactory(appRouter);
