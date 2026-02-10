import {
  TreeDeciduous,
  Car,
  Lightbulb,
  Recycle,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export function ImpactSection() {
  return (
    <div className="mt-8 rounded-3xl bg-gradient-to-br from-pink-50 to-pink-100/50 p-6 sm:p-8">
      <h2 className="text-eco-neutral-900 mb-6 flex items-center gap-2 text-xl font-bold">
        Environmental Impact{" "}
        <Sparkles className="h-5 w-5 fill-pink-400 text-pink-400" />
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <ImpactItem
          icon={TreeDeciduous}
          text="Equivalent to planting 87 trees"
          iconColor="text-green-600"
        />
        <ImpactItem
          icon={Car}
          text="Saved emissions equal to 2,340 km of driving"
          iconColor="text-red-500"
        />
        <ImpactItem
          icon={Lightbulb}
          text="Energy generated could power 42 homes for a day"
          iconColor="text-yellow-500"
        />
        <ImpactItem
          icon={Recycle}
          text="70% of packages successfully reused"
          iconColor="text-emerald-500"
        />
      </div>
    </div>
  );
}

function ImpactItem({
  icon: Icon,
  text,
  iconColor,
}: {
  icon: LucideIcon;
  text: string;
  iconColor: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
      <div className="bg-eco-neutral-50 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <span className="text-eco-neutral-700 text-sm font-medium">{text}</span>
    </div>
  );
}
