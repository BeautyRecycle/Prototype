import { Clock, MapPin, Navigation } from "lucide-react";
import { type MapLocation } from "./interactive-map";
import { Button } from "~/components/ui/Button";
import { Card } from "~/components/ui/Card";

interface LocationListProps {
  locations: MapLocation[];
}

export function LocationList({ locations }: LocationListProps) {
  return (
    <div className="mt-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-eco-neutral-900 text-xl font-bold">
          Nearby Locations
        </h2>
        <Button
          variant="ghost"
          className="h-auto p-0 font-medium text-pink-500 hover:text-pink-600"
        >
          <Navigation className="mr-1.5 h-4 w-4" /> Navigate
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {locations.map((loc) => (
          <Card
            key={loc.id}
            variant="default"
            padding="md"
            className="hover:border-eco-primary-200 group flex items-start gap-4 transition-all hover:shadow-md"
          >
            {/* Icon */}
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                loc.type === "box"
                  ? "bg-pink-100 text-pink-500"
                  : "bg-orange-100 text-orange-500"
              }`}
            >
              <MapPin className="h-6 w-6 fill-current" />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between">
                <h3 className="text-eco-neutral-900 truncate pr-2 text-sm font-bold sm:text-base">
                  {loc.name}
                </h3>
                <span className="shrink-0 rounded-full bg-pink-50 px-2 py-0.5 text-xs font-semibold text-pink-500">
                  {loc.distance} km
                </span>
              </div>

              <p className="text-eco-neutral-500 mt-1 truncate text-xs sm:text-sm">
                {loc.address}
              </p>

              <div className="text-eco-neutral-400 mt-3 flex items-center gap-1.5 text-xs font-medium">
                <Clock className="h-3.5 w-3.5" />
                {loc.openUntil === "24/7" ? (
                  <span className="text-emerald-600">Open 24/7</span>
                ) : (
                  <span>Open until {loc.openUntil}</span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
