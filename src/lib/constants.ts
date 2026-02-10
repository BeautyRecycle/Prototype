import type { Fate, Material } from "~/types/domain";

// ── CO₂ Savings Coefficients (kg per package) ──
// Sources: estimates based on EPA and lifecycle analysis data
// Reuse saves significantly more than energy recovery
export const CO2_COEFFICIENTS: Record<Material, Record<Fate, number>> = {
  PET: { reuse: 0.5, energy: 0.12 },
  HDPE: { reuse: 0.45, energy: 0.1 },
  Glass: { reuse: 0.3, energy: 0.05 },
  Aluminum: { reuse: 0.9, energy: 0.35 },
  Mixed: { reuse: 0.2, energy: 0.05 },
} as const;

// ── Points Logic ──
export const POINTS_BY_FATE: Record<Fate, number> = {
  reuse: 20,
  energy: 5,
} as const;

// ── Material Classification Labels ──
export const MATERIAL_LABELS: Record<Material, string> = {
  PET: "PET Plastic",
  HDPE: "HDPE Plastic",
  Glass: "Glass",
  Aluminum: "Aluminum",
  Mixed: "Mixed Material",
} as const;

// ── Fate Labels ──
export const FATE_LABELS: Record<Fate, string> = {
  reuse: "Reusable",
  energy: "Energy Recovery",
} as const;

// ── Mock Package Database ──
// Static mapping from QR/barcode values to material + fate
// Designed to be deterministic and replaceable by real ML later
export const PACKAGE_DATABASE: Record<
  string,
  { material: Material; fate: Fate }
> = {
  // PET packages
  QR_PET_001: { material: "PET", fate: "reuse" },
  QR_PET_002: { material: "PET", fate: "energy" },
  QR_PET_003: { material: "PET", fate: "reuse" },

  // HDPE packages
  QR_HDPE_001: { material: "HDPE", fate: "reuse" },
  QR_HDPE_002: { material: "HDPE", fate: "energy" },

  // Glass packages
  QR_GLASS_001: { material: "Glass", fate: "reuse" },
  QR_GLASS_002: { material: "Glass", fate: "reuse" },

  // Aluminum packages
  QR_ALU_001: { material: "Aluminum", fate: "reuse" },
  QR_ALU_002: { material: "Aluminum", fate: "energy" },

  // Mixed material
  QR_MIX_001: { material: "Mixed", fate: "energy" },
  QR_MIX_002: { material: "Mixed", fate: "energy" },
} as const;

// ── Fallback for unknown packages ──
export const DEFAULT_PACKAGE = {
  material: "Mixed" as Material,
  fate: "energy" as Fate,
} as const;
