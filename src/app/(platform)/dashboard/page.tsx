"use client";

import { api } from "~/trpc/react";
import { GlowStatCard } from "~/components/dashboard/GlowStatCard";
import { ActivityCard } from "~/components/dashboard/ActivityCard";
import { ImpactBanner } from "~/components/dashboard/ImpactBanner";
import { Package, Leaf, Zap } from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "~/components/animations/MotionPrimitives";

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } =
    api.user.getImpactStats.useQuery();
  const { data: scansData, isLoading: scansLoading } =
    api.scan.getUserScans.useQuery({ limit: 3 });

  if (statsLoading || scansLoading) {
    return <DashboardSkeleton />;
  }

  // ── Mock Data for Prototype (Matches Design) ──
  const MOCK_SCANS = [
    {
      id: "mock-1",
      material: "CARDBOARD",
      packageId: "Cardboard Box",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      pointsEarned: 10,
    },
    {
      id: "mock-2",
      material: "PLASTIC",
      packageId: "Plastic Container",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      pointsEarned: 8,
    },
    {
      id: "mock-3",
      material: "GLASS",
      packageId: "Glass Jar",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      pointsEarned: 12,
    },
  ];

  const recentScans =
    scansData?.scans && scansData.scans.length > 0
      ? scansData.scans
      : MOCK_SCANS;

  // Calculate plastic saved (sum of all plastic-type materials)
  const plasticSavedKg =
    stats?.scansByMaterial
      .filter((m) =>
        ["plastic", "pet", "hdpe", "pp"].includes(m.material.toLowerCase()),
      )
      .reduce((sum, m) => sum + m.co2SavedKg, 0) ?? 0;

  // Energy generated (estimate: 1 kg plastic = ~10 kWh)
  const energyGeneratedKwh = Math.round(plasticSavedKg * 10 * 100) / 100;

  return (
    <div className="from-eco-primary-50 to-eco-secondary-50 min-h-screen bg-gradient-to-br">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Welcome Header */}
        <FadeIn>
          <div className="mb-10">
            <h1 className="text-eco-primary-900 mb-2 text-4xl font-bold tracking-tight">
              Welcome Back, Beauty!
            </h1>
            <p className="text-eco-primary-600 text-lg font-medium">
              Here&apos;s your gorgeous impact so far ✨
            </p>
          </div>
        </FadeIn>

        {/* Top Stat Cards */}
        <StaggerContainer className="mb-8 grid gap-6 sm:grid-cols-3">
          <StaggerItem>
            <GlowStatCard
              title="Packages Returned"
              value={stats?.totalScans ?? 0}
              icon={<Package className="text-white" />}
              variant="gradient"
              message="Keep glowing, gorgeous! 💖"
            />
          </StaggerItem>
          <StaggerItem>
            <GlowStatCard
              title="Plastic Saved"
              value={plasticSavedKg}
              suffix=" kg"
              decimals={1}
              icon={<Leaf />}
              variant="pink"
            />
          </StaggerItem>
          <StaggerItem>
            <GlowStatCard
              title="Energy Generated"
              value={energyGeneratedKwh}
              suffix=" kWh"
              decimals={1}
              icon={<Zap />}
              variant="yellow"
            />
          </StaggerItem>
        </StaggerContainer>

        {/* Impact Banner */}
        <div className="mb-8">
          <ImpactBanner co2SavedKg={stats?.totalCo2SavedKg ?? 0} />
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-eco-primary-900 mb-6 text-2xl font-bold tracking-tight">
            Recent Activity
          </h2>
          {recentScans.length > 0 ? (
            <div className="grid gap-4 md:gap-6 sm:grid-cols-3">
              {recentScans.map((scan) => (
                <ActivityCard
                  key={scan.id}
                  material={scan.material as any}
                  itemName={scan.packageId || "Unknown Package"}
                  createdAt={scan.createdAt}
                  pointsEarned={scan.pointsEarned}
                />
              ))}
            </div>
          ) : (
            <FadeIn>
              <div className="bg-eco-neutral-50 rounded-2xl p-12 text-center">
                <p className="text-eco-neutral-500 text-lg">
                  No activity yet. Start scanning packages to see your impact!
                  📦✨
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Inline SVG Icons ──

function LeafIcon() {
  return (
    <svg
      className="h-7 w-7"
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
      className="h-7 w-7"
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

function BoltIcon() {
  return (
    <svg
      className="h-7 w-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  );
}

function DashboardSkeleton() {
  return (
    <div className="from-eco-primary-50 to-eco-secondary-50 min-h-screen bg-linear-to-br">
      <div className="mx-auto max-w-6xl animate-pulse px-4 py-8">
        <div className="bg-eco-neutral-200 mb-2 h-10 w-80 rounded" />
        <div className="bg-eco-neutral-100 mb-8 h-6 w-96 rounded" />
        <div className="mb-8 grid gap-6 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-eco-neutral-100 h-44 rounded-3xl" />
          ))}
        </div>
        <div className="bg-eco-neutral-100 mb-8 h-32 rounded-3xl" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-eco-neutral-100 h-20 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
