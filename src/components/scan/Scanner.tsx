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
  const isRunningRef = useRef(false);

  const startScanner = useCallback(async () => {
    if (isRunningRef.current || !isActive) return;

    try {
      const scanner = new Html5Qrcode("scanner-region");
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1,
        },
        (decodedText) => {
          onScan(decodedText);
        },
        () => {
          // Ignore scan failures (expected for non-QR frames)
        },
      );

      isRunningRef.current = true;
    } catch (err) {
      console.error("[Scanner] Failed to start camera:", err);
    }
  }, [onScan, isActive]);

  useEffect(() => {
    void startScanner();

    // 🔴 CRITICAL: Stop camera on unmount to prevent Chrome lock
    return () => {
      if (scannerRef.current && isRunningRef.current) {
        scannerRef.current
          .stop()
          .then(() => {
            isRunningRef.current = false;
            scannerRef.current = null;
          })
          .catch(() => {
            // Ignore stop errors during cleanup
          });
      }
    };
  }, [startScanner]);

  return (
    <div className="mx-auto w-full max-w-md">
      <div
        id="scanner-region"
        className="border-eco-primary-200 bg-eco-neutral-900 overflow-hidden rounded-2xl border-2"
        style={{ minHeight: 300 }}
      />
      <p className="text-eco-neutral-500 mt-3 text-center text-sm">
        Point your camera at a QR code on any cosmetic package
      </p>
    </div>
  );
}
