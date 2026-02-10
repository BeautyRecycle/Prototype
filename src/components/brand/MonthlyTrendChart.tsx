"use client";

import { Card } from "~/components/ui/Card";
import { Calendar } from "lucide-react";

export function MonthlyTrendChart() {
  // Mock data points for the path
  const points = [
    { x: 0, y: 50 },
    { x: 20, y: 65 },
    { x: 40, y: 55 },
    { x: 60, y: 70 },
    { x: 80, y: 85 },
    { x: 100, y: 100 },
  ];

  const svgPoints = points.map((p) => `${p.x} ${100 - p.y}`).join(" L ");

  return (
    <Card className="flex h-full flex-col p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-eco-neutral-900 text-lg font-bold">
          Monthly Collection Trend
        </h3>
        <Calendar className="h-5 w-5 text-pink-400" />
      </div>

      <div className="relative min-h-[200px] w-full flex-1">
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Grid Lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="#f3f4f6"
              strokeWidth="0.5"
              strokeDasharray="2"
            />
          ))}

          {/* Gradient Defs */}
          <defs>
            <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>
          </defs>

          {/* Line */}
          <path
            d={`M ${points[0]?.x ?? 0} ${100 - (points[0]?.y ?? 0)} L ${svgPoints}`}
            fill="none"
            stroke="url(#line-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-sm"
          />

          {/* Dots */}
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={100 - p.y}
              r="2"
              fill="white"
              stroke="#ec4899"
              strokeWidth="1.5"
            />
          ))}
        </svg>

        {/* Labels X-Axis */}
        <div className="text-eco-neutral-400 mt-2 flex translate-y-2 justify-between text-xs font-medium">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
        </div>

        {/* Labels Y-Axis */}
        <div className="text-eco-neutral-300 pointer-events-none absolute top-0 left-0 flex h-full -translate-x-6 flex-col justify-between text-xs">
          <span>340</span>
          <span>255</span>
          <span>170</span>
          <span>85</span>
          <span>0</span>
        </div>
      </div>
    </Card>
  );
}
