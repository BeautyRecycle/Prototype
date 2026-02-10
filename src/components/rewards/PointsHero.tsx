import { Trophy, Star } from "lucide-react";
import { AnimatedCounter } from "~/components/animations/AnimatedCounter";

interface PointsHeroProps {
  points: number;
}

export function PointsHero({ points }: PointsHeroProps) {
  // Simple logic for next reward tier (every 100 points)
  const nextRewardThreshold = Math.ceil((points + 1) / 100) * 100;
  const pointsNeeded = nextRewardThreshold - points;

  return (
    <div className="from-eco-primary-100 to-eco-primary-300 relative overflow-hidden rounded-3xl bg-gradient-to-br p-8 shadow-sm">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex-1">
          <p className="text-eco-primary-900 mb-2 text-sm font-medium opacity-80">
            Your Beauty Points
          </p>
          <div className="text-eco-primary-900 text-6xl font-bold tracking-tight">
            <AnimatedCounter value={points} />
          </div>

          <div className="text-eco-primary-800 mt-6 flex items-center gap-2 font-medium">
            <Star className="fill-eco-primary-700 text-eco-primary-700 h-5 w-5" />
            <span>{pointsNeeded} points until next reward!</span>
          </div>
        </div>

        <div className="self-center rounded-2xl bg-white/40 p-6 backdrop-blur-sm md:self-auto">
          <Trophy
            className="text-eco-primary-800 h-16 w-16"
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* Decorative blurred circles */}
      <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/30 blur-3xl" />
      <div className="bg-eco-primary-400/20 pointer-events-none absolute bottom-0 left-0 h-32 w-32 rounded-full blur-2xl" />
    </div>
  );
}
