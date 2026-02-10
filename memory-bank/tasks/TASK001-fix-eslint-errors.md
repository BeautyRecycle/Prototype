# [TASK001] - Fix ESLint build errors

**Status:** Completed
**Added:** 2026-02-10
**Updated:** 2026-02-10

## Original Request
Fix ESLint errors preventing `pnpm run build` from succeeding.
Errors involved unused variables, `any` type usage, and optional chaining preferences.

## Implementation Plan
- [x] Read files with errors.
- [x] Fix `src/app/(platform)/dashboard/page.tsx`: unused icons and `any` cast.
- [x] Fix `src/components/dashboard/ActivityCard.tsx`: unused import.
- [x] Fix `src/server/api/routers/rewards.ts`: optional chaining.
- [x] Verify build.

## Progress Log
### 2026-02-10
- Analyzed 3 files with errors.
- Removed `LeafIcon`, `PackageIcon`, `BoltIcon`, and `Box`.
- Imported `Material` type and casted mock data to it.
- Applied optional chaining fix.
- Ran `pnpm run build` successfully.
