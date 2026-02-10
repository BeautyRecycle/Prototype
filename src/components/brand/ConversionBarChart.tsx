"use client";

import { Card } from "~/components/ui/Card";

const BAR_DATA = [
  { label: "W1", reuse: 45, energy: 32 },
  { label: "W2", reuse: 52, energy: 28 },
  { label: "W3", reuse: 48, energy: 35 },
  { label: "W4", reuse: 58, energy: 30 },
];

export function ConversionBarChart() {
  return (
    <Card className="flex h-full flex-col p-6">
      <h3 className="text-eco-neutral-900 mb-6 text-lg font-bold">
        Reuse vs Energy Conversion
      </h3>

      <div className="flex flex-1 items-end justify-between gap-4 px-2">
        {BAR_DATA.map((item) => (
          <div
            key={item.label}
            className="group flex h-full flex-1 items-end justify-center gap-2"
          >
            {/* Reuse Bar */}
            <div
              className="relative w-3/12 rounded-t-lg bg-pink-400 transition-colors group-hover:bg-pink-500 sm:w-4/12"
              style={{ height: `${item.reuse}%` }}
            ></div>

            {/* Energy Bar */}
            <div
              className="relative w-3/12 rounded-t-lg bg-amber-400 transition-colors group-hover:bg-amber-500 sm:w-4/12"
              style={{ height: `${item.energy}%` }}
            ></div>
          </div>
        ))}
      </div>

      {/* X-Axis Labels */}
      <div className="text-eco-neutral-500 mt-3 flex justify-between px-4 text-xs font-medium">
        {BAR_DATA.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-pink-400" />
          <span className="text-eco-neutral-600 text-xs font-medium">
            Reuse
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-amber-400" />
          <span className="text-eco-neutral-600 text-xs font-medium">
            Energy
          </span>
        </div>
      </div>
    </Card>
  );
}
