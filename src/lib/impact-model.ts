import type { Fate, Material } from "~/types/domain";
import { CO2_COEFFICIENTS, POINTS_BY_FATE } from "./constants";

/**
 * Calculate CO₂ saved (kg) for a given material and fate.
 *
 * Pure function — no side effects.
 * OCP: extend by adding entries to CO2_COEFFICIENTS, not by modifying this function.
 */
export function calculateCO2Saved(material: Material, fate: Fate): number {
  const coefficient = CO2_COEFFICIENTS[material]?.[fate];

  if (coefficient === undefined) {
    console.warn(
      `[ImpactModel] Unknown material/fate combo: ${material}/${fate}. Defaulting to 0.`,
    );
    return 0;
  }

  // Round to 2 decimal places for clean display
  return Math.round(coefficient * 100) / 100;
}

/**
 * Calculate points earned for a given package fate.
 *
 * Reusable packaging earns more points (incentivize reuse over energy recovery).
 */
export function calculatePoints(fate: Fate): number {
  return POINTS_BY_FATE[fate] ?? 0;
}

/**
 * Calculate equivalent trees planted from CO₂ saved.
 * Rough estimate: 1 tree absorbs ~22 kg CO₂ per year.
 */
export function calculateTreeEquivalent(totalCo2SavedKg: number): number {
  const CO2_PER_TREE_PER_YEAR = 22;
  return Math.round((totalCo2SavedKg / CO2_PER_TREE_PER_YEAR) * 100) / 100;
}

/**
 * Calculate equivalent car kilometers offset from CO₂ saved.
 * Average car emits ~0.12 kg CO₂ per km.
 */
export function calculateCarKmOffset(totalCo2SavedKg: number): number {
  const CO2_PER_CAR_KM = 0.12;
  return Math.round((totalCo2SavedKg / CO2_PER_CAR_KM) * 100) / 100;
}
