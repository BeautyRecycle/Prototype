"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { api } from "~/trpc/react";
import { ScanResultCard } from "~/components/scan/ScanResultCard";
import type { ScanResult } from "~/types/domain";
import { Camera, Lightbulb } from "lucide-react";

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
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4">
      <div className="mt-4 mb-8 text-center">
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-[#A50036]">
          Scan Your Package
        </h1>
        <p className="text-lg font-medium text-rose-400">
          Scan your beauty package to see how it will be processed ✨
        </p>
      </div>

      {state === "scanning" && (
        <div className="relative w-full">
          {/* Camera Frame Container with Pink Gradient Border effect */}
          <div className="mb-8 rounded-[2.5rem] bg-gradient-to-br from-pink-300 via-rose-200 to-orange-100 p-1.5 shadow-xl shadow-pink-100/50">
            <div className="relative min-h-[400px] overflow-hidden rounded-[2rem] bg-rose-50/50">
              {/* Only mount scanner when visible to avoid permission issues */}
              <Scanner onScan={handleScan} isActive={state === "scanning"} />

              {/* Decorative Overlay */}
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <div className="mb-4 h-40 w-64 rounded-3xl border-2 border-white/40" />
                <div className="mb-4 rounded-full bg-[#A50036]/10 p-4">
                  <Camera className="h-8 w-8 text-[#A50036]" />
                </div>
                <p className="rounded-full bg-white/30 px-4 py-1 text-lg font-medium text-[#A50036] backdrop-blur-sm">
                  Position package in frame
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleScan("mock-manual-scan")} // Fallback/Simulator
            className="mx-auto mb-10 block w-full max-w-sm rounded-full bg-[#F43F5E] px-8 py-4 text-lg font-bold text-white shadow-lg shadow-rose-200 transition-transform hover:bg-[#E11D48] active:scale-95"
          >
            Scan Package
          </button>
        </div>
      )}

      {state === "classifying" && (
        <div className="flex flex-col items-center gap-6 py-20">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-current border-t-transparent text-[#F43F5E]" />
          <p className="animate-pulse text-xl font-medium text-[#A50036]">
            Classifying package...
          </p>
        </div>
      )}

      {state === "result" && result && (
        <ScanResultCard result={result} onScanAgain={handleScanAgain} />
      )}

      {/* Beauty Tip Section */}
      <div className="mx-auto mb-8 flex w-full max-w-lg items-center gap-3 rounded-2xl border border-pink-100 bg-pink-50 p-4 shadow-sm">
        <Lightbulb className="h-5 w-5 shrink-0 fill-yellow-500 text-yellow-500" />
        <p className="text-sm font-medium text-[#A50036]">
          <span className="font-bold">Beauty Tip:</span> Make sure the barcode
          or label is clearly visible for best results
        </p>
      </div>
    </div>
  );
}

function ScannerSkeleton() {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="border-eco-neutral-200 bg-eco-neutral-100 flex h-[300px] items-center justify-center rounded-2xl border-2">
        <div className="text-center">
          <div className="bg-eco-neutral-300 mx-auto mb-3 h-8 w-8 animate-pulse rounded-full" />
          <p className="text-eco-neutral-400 text-sm">Loading camera...</p>
        </div>
      </div>
    </div>
  );
}
