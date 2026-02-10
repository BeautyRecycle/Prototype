"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";

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
 * 🔴 CRITICAL: Camera is stopped on unmount AND when navigating away.
 *
 * Uses html5-qrcode for cross-browser camera access.
 */
export default function Scanner({ onScan, isActive = true }: ScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const onScanRef = useRef(onScan);
  const [error, setError] = useState<string | null>(null);
  const [elementId] = useState(
    () => `scanner-region-${Math.random().toString(36).slice(2, 9)}`,
  );
  const pathname = usePathname();
  const initialPathRef = useRef(pathname);

  // Keep onScan ref updated
  useEffect(() => {
    onScanRef.current = onScan;
  }, [onScan]);

  // Stop camera when navigating away from the scan page
  useEffect(() => {
    if (pathname !== initialPathRef.current) {
      console.log("[Scanner] Route changed, stopping camera");
      stopCamera();
    }
  }, [pathname]);

  // Cleanup helper function
  const stopCamera = async () => {
    const scannerInstance = scannerRef.current;
    if (!scannerInstance) return;

    try {
      const state = scannerInstance.getState();
      if (
        state === Html5QrcodeScannerState.SCANNING ||
        state === Html5QrcodeScannerState.PAUSED
      ) {
        await scannerInstance.stop();
        console.log("[Scanner] Camera stopped");
      }
    } catch (err) {
      console.warn("[Scanner] Stop error:", err);
    }

    try {
      scannerInstance.clear();
    } catch {
      // Already cleared
    }

    // Fallback: manually stop ALL media tracks in the document
    try {
      const videoElements = document.querySelectorAll("video");
      videoElements.forEach((video) => {
        const stream = video.srcObject as MediaStream | null;
        if (stream) {
          stream.getTracks().forEach((track) => {
            track.stop();
            console.log("[Scanner] Stopped track:", track.label);
          });
          video.srcObject = null;
        }
      });
    } catch {
      // Ignore cleanup errors
    }

    scannerRef.current = null;
  };

  useEffect(() => {
    if (!isActive) {
      void stopCamera();
      return;
    }

    let isMounted = true;
    let scanner: Html5Qrcode | null = null;

    const startScanner = async () => {
      // Wait for DOM element to be available
      await new Promise((resolve) => setTimeout(resolve, 50));

      if (!isMounted) return;

      const element = document.getElementById(elementId);
      if (!element) {
        console.error("[Scanner] Element not found:", elementId);
        return;
      }

      try {
        scanner = new Html5Qrcode(elementId, { verbose: false });
        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1,
          },
          (decodedText) => {
            if (isMounted) {
              onScanRef.current(decodedText);
            }
          },
          () => {
            // Ignore decode failures - expected behavior
          },
        );

        console.log("[Scanner] Camera started successfully");
        setError(null);
      } catch (err) {
        console.error("[Scanner] Failed to start camera:", err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Camera access failed");
        }
      }
    };

    void startScanner();

    // Cleanup function
    return () => {
      isMounted = false;
      void stopCamera();
    };
  }, [isActive, elementId]);

  // Also cleanup on page hide/visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log("[Scanner] Page hidden, stopping camera");
        void stopCamera();
      }
    };

    const handleBeforeUnload = () => {
      void stopCamera();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("pagehide", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pagehide", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="mx-auto h-full min-h-[400px] w-full">
      <div
        id={elementId}
        className="h-full min-h-[400px] overflow-hidden rounded-[1.5rem]"
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-rose-50/90">
          <div className="p-4 text-center">
            <p className="mb-2 font-medium text-red-600">Camera Error</p>
            <p className="text-sm text-red-500">{error}</p>
            <p className="mt-2 text-xs text-gray-500">
              Please ensure camera permissions are granted
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
