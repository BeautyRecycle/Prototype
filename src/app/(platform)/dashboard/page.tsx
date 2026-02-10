"use client";

import { api } from "~/trpc/react";
import { StatCard } from "~/components/dashboard/StatCard";
import { ImpactChart } from "~/components/dashboard/ImpactChart";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "~/components/animations/MotionPrimitives";
import { Card, CardHeader, CardTitle } from "~/components/ui/Card";
import { MATERIAL_LABELS, FATE_LABELS } from "~/lib/constants";

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } =
    api.user.getImpactStats.useQuery();
  const { data: scansData, isLoading: scansLoading } =
    api.scan.getUserScans.useQuery({ limit: 50 });

  if (statsLoading || scansLoading) {
    return <DashboardSkeleton />;
  }

  // Transform scans into chart data (aggregate by date)
  const chartData = buildChartData(scansData?.scans ?? []);

  return (
    <div>
      <FadeIn>
        <h1 className="text-eco-neutral-900 mb-2 text-2xl font-bold">
          Your Impact Dashboard
        </h1>
        <p className="text-eco-neutral-500 mb-8">
          Track your environmental contribution and points
        </p>
      </FadeIn>

      {/* Stat Cards */}
      <StaggerContainer className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StaggerItem>
          <StatCard
            title="CO₂ Saved"
            value={stats?.totalCo2SavedKg ?? 0}
            suffix=" kg"
            decimals={2}
            icon={<LeafIcon />}
            color="green"
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            title="Packages Returned"
            value={stats?.totalScans ?? 0}
            icon={<PackageIcon />}
            color="teal"
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            title="Points Balance"
            value={stats?.totalPoints ?? 0}
            icon={<StarIcon />}
            color="purple"
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            title="Points Earned"
            value={stats?.totalPointsEarned ?? 0}
            icon={<TrophyIcon />}
            color="amber"
          />
        </StaggerItem>
      </StaggerContainer>

      {/* Impact Chart */}
      <FadeIn className="mb-8">
        <ImpactChart data={chartData} />
      </FadeIn>

      {/* Breakdowns */}
      <div className="grid gap-4 sm:grid-cols-2">
        <FadeIn delay={0.1}>
          <Card variant="elevated" padding="md">
            <CardHeader>
              <CardTitle>By Material</CardTitle>
            </CardHeader>
            {stats?.scansByMaterial && stats.scansByMaterial.length > 0 ? (
              <div className="space-y-3">
                {stats.scansByMaterial.map((m) => (
                  <div
                    key={m.material}
                    className="flex items-center justify-between"
                  >
                    <span className="text-eco-neutral-600 text-sm">
                      {MATERIAL_LABELS[
                        m.material as keyof typeof MATERIAL_LABELS
                      ] ?? m.material}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-eco-neutral-400 text-xs">
                        {m.co2SavedKg.toFixed(2)} kg CO₂
                      </span>
                      <span className="bg-eco-primary-100 text-eco-primary-700 rounded-full px-2.5 py-0.5 text-xs font-semibold">
                        {m.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-eco-neutral-400 text-sm">No scans yet</p>
            )}
          </Card>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Card variant="elevated" padding="md">
            <CardHeader>
              <CardTitle>By Outcome</CardTitle>
            </CardHeader>
            {stats?.scansByFate && stats.scansByFate.length > 0 ? (
              <div className="space-y-3">
                {stats.scansByFate.map((f) => (
                  <div
                    key={f.fate}
                    className="flex items-center justify-between"
                  >
                    <span className="text-eco-neutral-600 text-sm">
                      {f.fate === "reuse" ? "♻️" : "⚡"}{" "}
                      {FATE_LABELS[f.fate as keyof typeof FATE_LABELS] ??
                        f.fate}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-eco-neutral-400 text-xs">
                        {f.co2SavedKg.toFixed(2)} kg CO₂
                      </span>
                      <span className="bg-eco-primary-100 text-eco-primary-700 rounded-full px-2.5 py-0.5 text-xs font-semibold">
                        {f.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-eco-neutral-400 text-sm">No scans yet</p>
            )}
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}

// ── Helpers ──

interface ScanRecord {
  createdAt: Date;
  co2SavedKg: number;
}

function buildChartData(scans: ScanRecord[]) {
  const grouped: Record<string, number> = {};

  for (const scan of scans) {
    const date = new Date(scan.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    grouped[date] = (grouped[date] ?? 0) + scan.co2SavedKg;
  }

  // Cumulative
  let cumulative = 0;
  return Object.entries(grouped)
    .reverse()
    .map(([date, co2]) => {
      cumulative += co2;
      return { date, co2: Math.round(cumulative * 100) / 100 };
    });
}

// ── Inline SVG Icons ──

function LeafIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.85 0 3.58-.5 5.07-1.38C14.82 18.38 13 15.44 13 12c0-3.44 1.82-6.38 4.07-8.62A9.96 9.96 0 0012 2z"
      />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 9V2h12v7a6 6 0 01-12 0zM6 4H3v3a3 3 0 003 3M18 4h3v3a3 3 0 01-3 3M9 21h6M12 15v6"
      />
    </svg>
  );
}

function DashboardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-eco-neutral-200 mb-2 h-8 w-64 rounded" />
      <div className="bg-eco-neutral-100 mb-8 h-5 w-80 rounded" />
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-eco-neutral-100 h-28 rounded-2xl" />
        ))}
      </div>
      <div className="bg-eco-neutral-100 mb-8 h-80 rounded-2xl" />
    </div>
  );
}
