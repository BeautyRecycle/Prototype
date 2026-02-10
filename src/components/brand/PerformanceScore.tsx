import { BarChart3 } from "lucide-react";

export function PerformanceScore() {
  return (
    <div className="mt-8 rounded-3xl bg-pink-200/50 p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-2">
        <BarChart3 className="text-eco-neutral-700 h-5 w-5" />
        <h2 className="text-eco-neutral-800 text-lg font-bold">
          Performance Score
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Progress Bar Container */}
        <div className="h-6 flex-1 overflow-hidden rounded-full bg-white/60">
          <div
            className="h-full rounded-full bg-pink-500"
            style={{ width: "87%" }}
          ></div>
        </div>

        <span className="text-eco-neutral-800 text-3xl font-bold">87%</span>
      </div>

      <p className="text-eco-neutral-600 mt-4 text-sm font-medium">
        Your brand is in the top 10% of sustainable beauty practices! 💖
      </p>
    </div>
  );
}
