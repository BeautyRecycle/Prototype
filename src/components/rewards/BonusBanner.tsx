import { Gift, Heart } from "lucide-react";

export function BonusBanner() {
  return (
    <div className="mt-8 flex flex-col items-center gap-6 rounded-2xl border border-orange-200/50 bg-gradient-to-r from-orange-100 to-rose-100 p-6 sm:flex-row sm:p-8">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/60 shadow-sm">
        <Gift className="h-6 w-6 text-orange-600" />
      </div>

      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-eco-neutral-900 mb-1 text-lg font-bold">
          Bonus Beauty Offer
        </h3>
        <p className="text-eco-neutral-700 font-medium">
          Return 5 packages this month and get double points! Plus a surprise
          beauty gift{" "}
          <Heart className="inline h-4 w-4 fill-pink-500 text-pink-500" />
        </p>
      </div>
    </div>
  );
}
