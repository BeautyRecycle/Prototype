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
    <div className="flex flex-col items-center max-w-2xl mx-auto w-full px-4">
      <div className="text-center mb-8 mt-4">
        <h1 className="text-[#A50036] mb-2 text-4xl font-bold tracking-tight">
          Scan Your Package
        </h1>
        <p className="text-rose-400 text-lg font-medium">
          Scan your beauty package to see how it will be processed ✨
        </p>
      </div>

      {state === "scanning" && (
        <div className="w-full relative">
          {/* Camera Frame Container with Pink Gradient Border effect */}
          <div className="rounded-[2.5rem] p-1.5 bg-gradient-to-br from-pink-300 via-rose-200 to-orange-100 shadow-xl shadow-pink-100/50 mb-8">
            <div className="rounded-[2rem] overflow-hidden bg-rose-50/50 relative min-h-[400px]">
              {/* Only mount scanner when visible to avoid permission issues */}
              <Scanner onScan={handleScan} isActive={state === "scanning"} />

              {/* Decorative Overlay */}
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                <div className="w-64 h-40 border-2 border-white/40 rounded-3xl mb-4" />
                <div className="bg-[#A50036]/10 p-4 rounded-full mb-4">
                  <Camera className="w-8 h-8 text-[#A50036]" />
                </div>
                <p className="text-[#A50036] font-medium text-lg bg-white/30 backdrop-blur-sm px-4 py-1 rounded-full">
                  Position package in frame
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleScan("mock-manual-scan")} // Fallback/Simulator
            className="w-full max-w-sm mx-auto block bg-[#F43F5E] hover:bg-[#E11D48] text-white text-lg font-bold py-4 px-8 rounded-full shadow-lg shadow-rose-200 transition-transform active:scale-95 mb-10"
          >
            Scan Package
          </button>
        </div>
      )}

      {state === "classifying" && (
        <div className="flex flex-col items-center gap-6 py-20">
          <div className="text-[#F43F5E] h-16 w-16 animate-spin rounded-full border-4 border-t-transparent border-current" />
          <p className="text-[#A50036] text-xl font-medium animate-pulse">
            Classifying package...
          </p>
        </div>
      )}

      {state === "result" && result && (
        <ScanResultCard result={result} onScanAgain={handleScanAgain} />
      )}

      {/* Beauty Tip Section */}
      <div className="bg-pink-50 rounded-2xl p-4 flex items-center gap-3 max-w-lg mx-auto w-full mb-8 border border-pink-100 shadow-sm">
        <Lightbulb className="w-5 h-5 text-yellow-500 shrink-0 fill-yellow-500" />
        <p className="text-[#A50036] text-sm font-medium">
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
