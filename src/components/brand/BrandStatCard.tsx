import type { LucideIcon } from "lucide-react";

interface BrandStatCardProps {
  label: string;
  value: string;
  subtext: string;
  icon: LucideIcon;
  color: "pink" | "yellow";
}

export function BrandStatCard({
  label,
  value,
  subtext,
  icon: Icon,
  color,
}: BrandStatCardProps) {
  const bgStyles = {
    pink: "bg-pink-100",
    yellow: "bg-yellow-100",
  };

  const iconStyles = {
    pink: "text-pink-600",
    yellow: "text-yellow-600",
  };

  return (
    <div
      className={`rounded-2xl p-6 ${bgStyles[color]} relative flex h-40 flex-col justify-between overflow-hidden transition-transform hover:scale-[1.02]`}
    >
      {/* Icon Header */}
      <div className="relative z-10 mb-2 flex items-center gap-2">
        <Icon className={`h-5 w-5 ${iconStyles[color]}`} />
        <span className={`text-sm font-medium ${iconStyles[color]}`}>
          {label}
        </span>
      </div>

      {/* Value */}
      <div className="relative z-10">
        <div className="text-eco-neutral-900 mb-1 text-4xl font-bold">
          {value}
        </div>
        <span className="text-eco-neutral-500 text-xs font-medium">
          {subtext}
        </span>
      </div>

      {/* Decorative gradient blob */}
      {color === "pink" && (
        <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-pink-200 opacity-60 blur-2xl" />
      )}
      {color === "yellow" && (
        <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-yellow-200 opacity-60 blur-2xl" />
      )}
    </div>
  );
}
