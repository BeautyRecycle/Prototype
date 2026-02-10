# Progress

## Status
- **Build:** Passing.
- **Linting:** Clean.

## What Works
- Dashboard page rendering (with mocks).
- Rewards API router (basic listings and redemption logic).
- Basic project structure.

## Known Issues
- `DashboardPage` uses mixed mock/real data logic that required type casting hacks (`as unknown as Material`). This should be standardized.
