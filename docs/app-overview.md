# Eco Beauty Circular — App Overview (Technical Guide)

## 1. Purpose of This Document

This file is the single source of truth for any AI agent or developer working on **Eco Beauty Circular**.
It defines the system vision, architecture, data flow, technical constraints, and implementation priorities for a hackathon-grade but judge-impressive web application.

The goal is **clarity over completeness**: everything here must be explainable, demoable, and extensible.

---

## 2. Product Vision (One-Liner)

Eco Beauty Circular is a web-based circular economy platform that incentivizes users to return cosmetic packaging through gamification, AI-assisted classification, and brand-backed rewards, while generating actionable sustainability data for partners.

---

## 3. Core User Journey (Happy Path)

1. User logs in via social authentication.
2. User scans a cosmetic package QR / barcode using browser camera.
3. System "classifies" the package (mock AI layer).
4. User instantly sees:
   - Package fate (reuse vs energy)
   - Environmental impact
   - Points earned

5. User visits dashboard to track impact.
6. User redeems points for eco-brand rewards.

This flow must be completable in **under 60 seconds during demo**.

---

## 4. Technology Stack (Hackathon-Optimized)

### Frontend

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Charts:** Recharts or Chart.js
- **Camera Access:** Web MediaDevices API

### Authentication

- **Clerk**
  - Social login (Google, GitHub)
  - No custom auth logic

### Backend (Lightweight)

- **Next.js Route Handlers / Edge Functions**
- No traditional backend server
- Mock AI endpoints

### Data Storage (Hackathon Mode)

- In-memory / static JSON
- Optional: LocalStorage for persistence

---

## 5. System Architecture (Conceptual)

```
[ Browser UI ]
      |
      v
[ Next.js App Router ]
      |
      v
[ /api/classify (Mock AI) ]
      |
      v
[ Classification Result + Impact Model ]
```

Key principle:

> Architecture must _look_ production-ready even if implementation is mocked.

---

## 6. Mock AI Layer (Critical for Judges)

### Why Mock?

- Real ML is out of scope for 24 hours.
- Judges care about system design, not dataset training.

### API Contract

`POST /api/classify`

**Input:**

```json
{
  "packageId": "QR_123456"
}
```

**Output:**

```json
{
  "material": "PET",
  "classification": "Reusable",
  "fate": "reuse",
  "co2SavedKg": 0.5,
  "pointsEarned": 20
}
```

### Internal Logic (Rule-Based)

- Static mapping table
- Deterministic output
- Designed to be replaceable by real ML later

---

## 7. Environmental Impact Model (Simplified but Credible)

All impact numbers are **estimates**.

Example assumptions (clearly stated in demo):

- 1 reused PET bottle ≈ 0.5 kg CO₂ saved
- Energy conversion yields lower CO₂ benefit

Formulas live in:
`/lib/impactModel.ts`

---

## 8. Gamification System

### Points Logic

- Reusable package: +20 points
- Energy conversion: +5 points

### User Metrics

- Total points
- Total packages returned
- Total CO₂ saved

No competitive mechanics required beyond visual leaderboard mock.

---

## 9. UI / UX Principles

### Design Language

- Eco-first (green, teal, neutral backgrounds)
- Minimal text, visual storytelling

### Animation Philosophy

- Animations explain cause → effect
- No decorative-only motion

Examples:

- Scan → Classification animation
- Slider showing reuse vs energy impact
- Count-up CO₂ numbers

---

## 10. Accessibility & Performance

### Accessibility

- Respect `prefers-reduced-motion`
- High contrast text
- Keyboard navigable core flows

### Performance Targets

- Initial load < 2s
- Avoid heavy 3D or large video assets

---

## 11. File & Folder Structure (Suggested)

```
/app
  /page.tsx            # Landing / Login
  /scan/page.tsx       # Scanner
  /dashboard/page.tsx  # Impact & Points
  /rewards/page.tsx    # Marketplace

/app/api/classify/route.ts

/lib
  impactModel.ts
  mockDatabase.ts

/components
  Scanner.tsx
  ImpactCard.tsx
  RewardCard.tsx
```

---

## 12. Demo Strategy (Engineering-Aware)

During demo, explicitly state:

- What is mocked
- What is production-ready
- What scales

Key sentence:

> "The AI layer is currently rule-based to validate UX and system design; it is architected to be replaced by a trained model without changing the frontend."

---

## 13. Out of Scope (Intentionally)

- Real ML training
- Real brand integrations
- Real payment or coupon systems

Stating exclusions signals maturity, not weakness.

---

## 14. Success Criteria (Hackathon)

- Judges understand the problem in 10 seconds
- Demo completes without friction
- Visuals communicate sustainability impact
- Architecture sounds real

---

## 15. Future Roadmap (Optional Slide)

- Computer vision-based material detection
- Brand ESG dashboards
- Smart bins & IoT integration

This reinforces long-term viability without implementation burden.

---

## Final Note

This system is designed to **win trust first, then scale**.
Elegance, clarity, and intentional constraints are the core engineering values behind Eco Beauty Circular.
