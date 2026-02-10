"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { api } from "~/trpc/react";
import { ScanResultCard } from "~/components/scan/ScanResultCard";
import type { ScanResult } from "~/types/domain";
import { Camera, Lightbulb, Sparkles, ScanLine } from "lucide-react";

// 🔴 CRITICAL: html5-qrcode must not run on server
const Scanner = dynamic(() => import("~/components/scan/Scanner"), {
  ssr: false,
  loading: () => <ScannerSkeleton />,
});

type ScanState = "scanning" | "classifying" | "result";

export default function ScanPage() {
  const [state, setState] = useState<ScanState>("scanning");
  const [result, setResult] = useState<
    (ScanResult & { scanId: string }) | null
  >(null);

  const classifyMutation = api.scan.classify.useMutation({
    onSuccess: (data) => {
      setResult(data);
      setState("result");
    },
    onError: (error) => {
      console.error("[ScanPage] Classification failed:", error);
      setState("scanning");
    },
  });

  const handleScan = useCallback(
    (packageId: string) => {
      if (state !== "scanning") return;
      setState("classifying");
      classifyMutation.mutate({ packageId });
    },
    [state, classifyMutation],
  );

  const handleScanAgain = useCallback(() => {
    setResult(null);
    setState("scanning");
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 pb-6">
      <div className="mt-4 mb-6 text-center">
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-[#A50036]">
          Scan Your Package
        </h1>
        <p className="text-lg font-medium text-rose-400">
          Scan your beauty package to see how it will be processed ✨
        </p>
      </div>

      {state === "scanning" && (
        <div className="relative w-full">
          {/* Camera Frame Container with Premium Gradient Border */}
          <div className="relative mb-6 rounded-[2rem] bg-gradient-to-br from-pink-400 via-rose-300 to-orange-200 p-1 shadow-2xl shadow-pink-200/60">
            {/* Inner Container */}
            <div className="relative min-h-[480px] overflow-hidden rounded-[1.75rem] bg-black">
              {/* Scanner component - handles its own cleanup */}
              <Scanner onScan={handleScan} isActive={state === "scanning"} />

              {/* Scanning Frame Overlay */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                {/* Large Scanning Target Frame */}
                <div className="relative h-72 w-80 sm:h-80 sm:w-96">
                  {/* Corner Brackets */}
                  {/* Top Left */}
                  <div className="absolute top-0 left-0 h-12 w-12 rounded-tl-2xl border-t-4 border-l-4 border-white/90" />
                  {/* Top Right */}
                  <div className="absolute top-0 right-0 h-12 w-12 rounded-tr-2xl border-t-4 border-r-4 border-white/90" />
                  {/* Bottom Left */}
                  <div className="absolute bottom-0 left-0 h-12 w-12 rounded-bl-2xl border-b-4 border-l-4 border-white/90" />
                  {/* Bottom Right */}
                  <div className="absolute right-0 bottom-0 h-12 w-12 rounded-br-2xl border-r-4 border-b-4 border-white/90" />

                  {/* Animated Scan Line */}
                  <div
                    className="absolute inset-x-4 top-4 h-0.5 animate-pulse bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-80"
                    style={{ animation: "scanLine 2s ease-in-out infinite" }}
                  />

                  {/* Center Crosshair */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="absolute -top-4 left-1/2 h-8 w-0.5 -translate-x-1/2 bg-white/40" />
                      <div className="absolute top-1/2 -left-4 h-0.5 w-8 -translate-y-1/2 bg-white/40" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Instruction Bar */}
              <div className="pointer-events-none absolute top-4 right-0 left-0 flex justify-center">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-5 py-2.5 backdrop-blur-md">
                  <ScanLine className="h-5 w-5 text-pink-400" />
                  <span className="text-sm font-semibold text-white">
                    Align barcode within frame
                  </span>
                </div>
              </div>

              {/* Bottom Info Bar */}
              <div className="pointer-events-none absolute right-0 bottom-4 left-0 flex justify-center">
                <div className="flex items-center gap-3 rounded-full bg-gradient-to-r from-pink-500/80 to-rose-500/80 px-6 py-3 shadow-lg backdrop-blur-md">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                    <Camera className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-white">
                      Position Package Here
                    </p>
                    <p className="text-xs text-white/80">
                      Hold steady for best results
                    </p>
                  </div>
                  <Sparkles className="h-5 w-5 animate-pulse text-yellow-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Scan Button */}
          <button
            onClick={() => handleScan("mock-manual-scan")}
            className="mx-auto mb-6 flex w-full max-w-sm items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#F43F5E] to-[#E11D48] px-8 py-4 text-lg font-bold text-white shadow-xl shadow-rose-300/50 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-rose-300/60 active:scale-95"
          >
            <Camera className="h-6 w-6" />
            Scan Package
          </button>
        </div>
      )}

      {state === "classifying" && (
        <div className="flex flex-col items-center gap-6 py-20">
          <div className="relative">
            <div className="h-20 w-20 animate-spin rounded-full border-4 border-pink-200 border-t-[#F43F5E]" />
            <Sparkles className="absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-[#F43F5E]" />
          </div>
          <div className="text-center">
            <p className="mb-1 text-xl font-bold text-[#A50036]">
              Analyzing Package...
            </p>
            <p className="text-sm text-rose-400">
              Identifying materials and recycling options
            </p>
          </div>
        </div>
      )}

      {state === "result" && result && (
        <ScanResultCard result={result} onScanAgain={handleScanAgain} />
      )}

      {/* Beauty Tip Section */}
      <div className="mx-auto flex w-full max-w-lg items-center gap-3 rounded-2xl border border-pink-100 bg-gradient-to-r from-pink-50 to-rose-50 p-4 shadow-sm">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-100">
          <Lightbulb className="h-5 w-5 fill-yellow-500 text-yellow-500" />
        </div>
        <p className="text-sm font-medium text-[#A50036]">
          <span className="font-bold">Pro Tip:</span> Ensure the barcode or
          product label is clearly visible and well-lit for accurate scanning
        </p>
      </div>

      {/* CSS for scan line animation */}
      <style jsx>{`
        @keyframes scanLine {
          0%,
          100% {
            top: 1rem;
            opacity: 0.6;
          }
          50% {
            top: calc(100% - 1rem);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

function ScannerSkeleton() {
  return (
    <div className="mx-auto w-full">
      <div className="flex min-h-[480px] items-center justify-center rounded-[1.75rem] bg-gray-900">
        <div className="text-center">
          <div className="relative mx-auto mb-4">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-pink-200/30 border-t-pink-400" />
            <Camera className="absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-pink-400" />
          </div>
          <p className="text-sm font-medium text-gray-400">
            Initializing camera...
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Please allow camera access
          </p>
        </div>
      </div>
    </div>
  );
}
