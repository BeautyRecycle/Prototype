"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { api } from "~/trpc/react";
import { ScanResultCard } from "~/components/scan/ScanResultCard";
import type { ScanResult } from "~/types/domain";

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
    <div className="flex flex-col items-center">
      <h1 className="text-eco-neutral-900 mb-2 text-2xl font-bold">
        Scan Package
      </h1>
      <p className="text-eco-neutral-500 mb-8">
        Scan a QR code to classify your cosmetic packaging
      </p>

      {state === "scanning" && (
        <Scanner onScan={handleScan} isActive={state === "scanning"} />
      )}

      {state === "classifying" && (
        <div className="flex flex-col items-center gap-4 py-16">
          <div className="border-eco-primary-200 border-t-eco-primary-600 h-12 w-12 animate-spin rounded-full border-4" />
          <p className="text-eco-neutral-600 text-sm font-medium">
            Classifying package...
          </p>
        </div>
      )}

      {state === "result" && result && (
        <ScanResultCard result={result} onScanAgain={handleScanAgain} />
      )}
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
