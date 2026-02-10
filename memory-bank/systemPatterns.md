# System Patterns

## Architecture
- **T3 Stack:** Next.js + tRPC + Prisma + Tailwind.
- **App Router:** Using Next.js 13+ App Router structure (`src/app`).
- **tRPC:** Type-safe API layer (`src/server/api`, `src/trpc`).
- **Components:** Modular UI components in `src/components`, grouped by feature (dashboard, rewards, scan).

## Design Patterns
- **Mock Data:** Currently using mock data in some components (e.g. `DashboardPage`) mixed with real API calls.
- **Motion:** Using `framer-motion` (implied by `MotionPrimitives.tsx`) for animations.

## Directory Structure
- `src/app`: Routes and pages.
- `src/components`: UI components.
- `src/server`: Backend logic (Prisma, tRPC routers).
- `src/lib`: Shared utilities.
- `src/types`: Domain types (Zod schemas).
