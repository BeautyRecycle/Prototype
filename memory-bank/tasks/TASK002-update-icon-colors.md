# [TASK002] - Update Icon Colors

**Status:** Completed
**Added:** 2026-02-10
**Updated:** 2026-02-10

## Original Request

"the Bg Colors Of the Icons: "FFA1AD" and the Icon itself: "A50036""

## Implementation Plan

- [ ] Identify components using colored icons.
  - `src/components/dashboard/ActivityCard.tsx`: Uses `bg-pink-100` and `text-emerald-600` for general recycling.
  - `src/components/dashboard/GlowStatCard.tsx`: Has "pink" variant.
- [ ] Update `ActivityCard.tsx` to use specific hex codes.
  - Replace `text-emerald-600` with `text-[#A50036]`.
  - Replace `bg-pink-100` with `bg-[#FFA1AD]`.
- [ ] Check if `GlowStatCard.tsx` needs updates (if it uses similar pink variables).

## Progress Log

### 2026-02-10

- Created task.
- Updated `ActivityCard.tsx` with new colors (`#FFA1AD`, `#A50036`) for the general recycling group.
- Updated `GlowStatCard.tsx` "pink" variant to use the same colors.
- Verified build.
