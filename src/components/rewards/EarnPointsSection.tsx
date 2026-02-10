import { Recycle, Flame, Users, Target } from "lucide-react";
import { Card } from "~/components/ui/Card";

const EARN_METHODS = [
  {
    icon: Recycle,
    title: "Return Reusable Package",
    points: "+15 pts",
    color: "text-green-600",
  },
  {
    icon: Flame,
    title: "Return Energy Package",
    points: "+10 pts",
    color: "text-orange-500",
  },
  {
    icon: Users,
    title: "Refer a Friend",
    points: "+50 pts",
    color: "text-blue-500",
  },
  {
    icon: Target,
    title: "Weekly Streak Bonus",
    points: "+20 pts",
    color: "text-red-500",
  },
];

export function EarnPointsSection() {
  return (
    <div className="mt-12">
      <h2 className="text-eco-primary-900 mb-6 text-2xl font-semibold">
        How to Earn Points
      </h2>

      <div className="custom-grid-cols grid gap-4">
        {EARN_METHODS.map((method, idx) => (
          <Card
            key={idx}
            padding="lg"
            className="border-eco-neutral-100 hover:border-eco-primary-200 group flex h-full cursor-pointer flex-col items-center justify-center gap-3 text-center transition-colors"
          >
            <method.icon
              className={`h-8 w-8 ${method.color} mb-1 transition-transform group-hover:scale-110`}
            />
            <h3 className="text-eco-neutral-800 text-sm font-medium">
              {method.title}
            </h3>
            <span className="text-eco-primary-600 bg-eco-primary-50 rounded-full px-3 py-1 text-xs font-bold">
              {method.points}
            </span>
          </Card>
        ))}
      </div>

      <style jsx>{`
        .custom-grid-cols {
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        }
        @media (min-width: 640px) {
          .custom-grid-cols {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
