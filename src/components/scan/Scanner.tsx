"use client";

import { useEffect, useRef, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface ScannerProps {
  /** Called when a QR/barcode is successfully decoded */
  onScan: (result: string) => void;
  /** Whether the scanner is currently active */
  isActive?: boolean;
}

/**
 * Scanner — camera-based QR/barcode reader.
 *
 * 🔴 CRITICAL: Must be loaded via dynamic(() => import(...), { ssr: false })
 * 🔴 CRITICAL: Camera is stopped on unmount to prevent Chrome camera lock.
 *
 * Uses html5-qrcode for cross-browser camera access.
 */
export default function Scanner({ onScan, isActive = true }: ScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const elementId = "scanner-region";
    // Create instance inside effect to ensure ownership
    const scanner = new Html5Qrcode(elementId);
    scannerRef.current = scanner;

    let isMounted = true;

    const start = async () => {
      try {
        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1,
          },
          (decodedText) => {
            if (isMounted) onScan(decodedText);
          },
          () => {
            // ignore failures
          },
        );
      } catch (err) {
        if (isMounted) {
          console.warn("Scanner start failed", err);
        }
      }
    };

    void start();

    return () => {
      isMounted = false;
      // Stop and clear to remove the video element
      scanner
        .stop()
        .then(() => scanner.clear())
        .catch(() => {
          // If stop fails (e.g. never started), still try to clear
          try {
            scanner.clear();
          } catch (_) {
            // ignore
          }
        });
    };
  }, [isActive, onScan]);

  return (
    <div className="mx-auto h-full min-h-[400px] w-full">
      <div
        id="scanner-region"
        className="h-full min-h-[400px] overflow-hidden rounded-[1.5rem]"
      />
    </div>
  );
}
