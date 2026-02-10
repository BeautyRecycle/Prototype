import type { ReactNode } from "react";
import { Card } from "~/components/ui/Card";
import { AnimatedCounter } from "~/components/animations/AnimatedCounter";

interface StatCardProps {
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  icon: ReactNode;
  color?: "teal" | "green" | "purple" | "amber";
}

const colorStyles = {
  teal: "text-eco-primary-600 bg-eco-primary-50",
  green: "text-eco-secondary-600 bg-eco-secondary-50",
  purple: "text-eco-points bg-purple-50",
  amber: "text-eco-energy bg-amber-50",
};

export function StatCard({
  title,
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  icon,
  color = "teal",
}: StatCardProps) {
  return (
    <Card variant="elevated" padding="md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-eco-neutral-500 text-sm font-medium">{title}</p>
          <div className="text-eco-neutral-900 mt-2 text-3xl font-bold">
            <AnimatedCounter
              value={value}
              prefix={prefix}
              suffix={suffix}
              decimals={decimals}
              duration={1.2}
            />
          </div>
        </div>
        <div
          className={`rounded-xl p-3 ${colorStyles[color]}`}
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}
