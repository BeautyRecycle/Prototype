import { z } from "zod";

// ── Material Types ──
export const MaterialEnum = z.enum([
  "PET",
  "HDPE",
  "Glass",
  "Aluminum",
  "Mixed",
]);
export type Material = z.infer<typeof MaterialEnum>;

// ── Fate (what happens to the package) ──
export const FateEnum = z.enum(["reuse", "energy"]);
export type Fate = z.infer<typeof FateEnum>;

// ── Classification Result (returned by mock AI) ──
export const ScanResultSchema = z.object({
  material: MaterialEnum,
  classification: z.string(),
  fate: FateEnum,
  co2SavedKg: z.number().nonnegative(),
  pointsEarned: z.number().int().nonnegative(),
});
export type ScanResult = z.infer<typeof ScanResultSchema>;

// ── User Impact Stats (dashboard aggregates) ──
export interface UserImpact {
  totalPoints: number;
  totalScans: number;
  totalCo2SavedKg: number;
  scansByMaterial: Record<Material, number>;
  scansByFate: Record<Fate, number>;
  recentScans: ScanHistory[];
}

// ── Scan History (individual scan record) ──
export interface ScanHistory {
  id: string;
  packageId: string;
  material: Material;
  fate: Fate;
  co2SavedKg: number;
  pointsEarned: number;
  createdAt: Date;
}

// ── Reward (marketplace item) ──
export interface RewardItem {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  imageUrl: string;
  stock: number;
  isActive: boolean;
}

// ── Package ID Validation ──
export const PackageIdSchema = z
  .string()
  .min(1, "Package ID is required")
  .regex(/^[A-Za-z0-9_-]+$/, "Invalid package ID format");
