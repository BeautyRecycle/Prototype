import type { ScanResult } from "~/types/domain";
import { DEFAULT_PACKAGE, PACKAGE_DATABASE } from "./constants";
import { calculateCO2Saved, calculatePoints } from "./impact-model";

/**
 * Interface for classification engines.
 *
 * DIP: Consumers depend on this interface, not on the concrete implementation.
 * LSP: Any implementation (mock, ML, hybrid) can be swapped without breaking callers.
 */
export interface IClassificationEngine {
  classify(packageId: string): ScanResult;
}

/**
 * Mock Classification Engine (Rule-Based)
 *
 * Uses a static lookup table to classify packages.
 * Designed to be replaced by a trained ML model without changing the frontend or router layer.
 *
 * Demo talking point:
 * "The AI layer is currently rule-based to validate UX and system design;
 *  it is architected to be replaced by a trained model without changing the frontend."
 */
export class MockClassificationEngine implements IClassificationEngine {
  classify(packageId: string): ScanResult {
    // Look up package in mock database, fall back to default
    const pkg = PACKAGE_DATABASE[packageId] ?? DEFAULT_PACKAGE;

    const co2SavedKg = calculateCO2Saved(pkg.material, pkg.fate);
    const pointsEarned = calculatePoints(pkg.fate);

    return {
      material: pkg.material,
      classification: pkg.fate === "reuse" ? "Reusable" : "Energy Recovery",
      fate: pkg.fate,
      co2SavedKg,
      pointsEarned,
    };
  }
}

/**
 * Singleton instance — used across the application.
 * Replace this instantiation to swap engines.
 */
export const classificationEngine: IClassificationEngine =
  new MockClassificationEngine();
