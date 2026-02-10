"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle } from "~/components/ui/Card";

interface ChartDataPoint {
  date: string;
  co2: number;
}

interface ImpactChartProps {
  data: ChartDataPoint[];
}

/**
 * ImpactChart — Recharts area chart for CO₂ saved over time.
 */
export function ImpactChart({ data }: ImpactChartProps) {
  if (data.length === 0) {
    return (
      <Card variant="elevated" padding="md">
        <CardHeader>
          <CardTitle>CO₂ Saved Over Time</CardTitle>
        </CardHeader>
        <div className="text-eco-neutral-400 flex h-48 items-center justify-center text-sm">
          Scan packages to start tracking your impact
        </div>
      </Card>
    );
  }

  return (
    <Card variant="elevated" padding="md">
      <CardHeader>
        <CardTitle>CO₂ Saved Over Time</CardTitle>
      </CardHeader>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="co2Gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#78716c" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#78716c" }}
            tickLine={false}
            axisLine={false}
            unit=" kg"
          />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e7e5e4",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
            }}
            formatter={(
              value: number | string | Array<number | string> | undefined,
            ) => {
              if (value === undefined) return ["0.00 kg", "CO₂ Saved"];
              const numValue = Number(value);
              return [
                `${isNaN(numValue) ? "0.00" : numValue.toFixed(2)} kg`,
                "CO₂ Saved",
              ];
            }}
          />
          <Area
            type="monotone"
            dataKey="co2"
            stroke="#0d9488"
            strokeWidth={2}
            fill="url(#co2Gradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
