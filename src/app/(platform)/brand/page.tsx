"use client";

import { FadeIn } from "~/components/animations/MotionPrimitives";
import { BrandStatCard } from "~/components/brand/BrandStatCard";
import { MonthlyTrendChart } from "~/components/brand/MonthlyTrendChart";
import { ConversionBarChart } from "~/components/brand/ConversionBarChart";
import { ImpactSection } from "~/components/brand/ImpactSection";
import { PerformanceScore } from "~/components/brand/PerformanceScore";
import { Package, Leaf, Zap, RefreshCw, Sparkles } from "lucide-react";

export default function BrandPage() {
  return (
    <div className="mx-auto max-w-5xl pb-12">
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-eco-primary-900 mb-2 text-3xl font-bold">
            Brand Dashboard
          </h1>
          <p className="flex items-center gap-2 font-medium text-pink-500">
            Track your beautiful environmental impact{" "}
            <Sparkles className="h-4 w-4" />
          </p>
        </div>
      </FadeIn>

      {/* Stats Row */}
      <FadeIn delay={0.1}>
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <BrandStatCard
            label="Collected"
            value="1,247"
            subtext="packages"
            icon={Package}
            color="pink"
          />
          <BrandStatCard
            label="CO₂ Saved"
            value="523.8"
            subtext="kg CO₂"
            icon={Leaf}
            color="pink"
          />
          <BrandStatCard
            label="Energy"
            value="892.4"
            subtext="kWh"
            icon={Zap}
            color="yellow"
          />
          <BrandStatCard
            label="Reused"
            value="876"
            subtext="packages"
            icon={RefreshCw}
            color="pink"
          />
        </div>
      </FadeIn>

      {/* Charts Row */}
      <FadeIn delay={0.2}>
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <MonthlyTrendChart />
          <ConversionBarChart />
        </div>
      </FadeIn>

      {/* Impact Section */}
      <FadeIn delay={0.3}>
        <ImpactSection />
      </FadeIn>

      {/* Performance Score */}
      <FadeIn delay={0.4}>
        <PerformanceScore />
      </FadeIn>
    </div>
  );
}
