import { Store, PackageOpen } from "lucide-react";
import { Card } from "~/components/ui/Card";

export type LocationType = "box" | "store";

export interface MapLocation {
  id: string;
  name: string;
  address: string;
  type: LocationType;
  distance: number;
  openUntil?: string; // e.g. "9 PM" or "24/7"
  coordinates: { x: number; y: number }; // Percentage 0-100 for mock map
}

interface MapVisualProps {
  locations: MapLocation[];
}

export function MapVisual({ locations }: MapVisualProps) {
  return (
    <div className="from-eco-primary-50 relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/40 bg-gradient-to-br via-rose-50 to-orange-50 shadow-inner md:aspect-[2/1]">
      {/* Grid Overlay to simulate map streets */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(236, 72, 153, 0.1) 1px, transparent 1px),
                               linear-gradient(to bottom, rgba(236, 72, 153, 0.1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Major Roads (Decorations) */}
      <div className="pointer-events-none absolute top-[30%] left-0 h-[12px] w-full bg-white/40" />
      <div className="pointer-events-none absolute top-0 right-[40%] h-full w-[12px] bg-white/40" />

      {/* Legend */}
      <Card
        variant="glass"
        padding="sm"
        className="absolute top-4 right-4 z-10 hidden min-w-[140px] flex-col gap-2 sm:flex"
      >
        <div className="text-eco-neutral-600 flex items-center gap-2 text-xs font-medium">
          <span className="bg-eco-primary-500 h-3 w-3 rounded-full" /> Return
          Box
        </div>
        <div className="text-eco-neutral-600 flex items-center gap-2 text-xs font-medium">
          <span className="bg-eco-secondary-500 h-3 w-3 rounded-full" /> Partner
          Store
        </div>
        <div className="text-eco-neutral-600 flex items-center gap-2 text-xs font-medium">
          <span className="border-eco-primary-500 box-border h-3 w-3 rounded-full border-2" />{" "}
          You
        </div>
      </Card>

      {/* "You" Marker */}
      <div
        className="absolute flex -translate-x-1/2 -translate-y-1/2 animate-pulse flex-col items-center justify-center"
        style={{ left: "48%", top: "42%" }}
      >
        <div className="border-eco-primary-600 h-6 w-6 rounded-full border-[3px] bg-white shadow-lg" />
        <div className="bg-eco-primary-500/20 absolute h-12 w-12 animate-ping rounded-full" />
      </div>

      {/* Location Markers */}
      {locations.map((loc) => (
        <LocationMarker key={loc.id} location={loc} />
      ))}
    </div>
  );
}

function LocationMarker({ location }: { location: MapLocation }) {
  const isBox = location.type === "box";
  return (
    <div
      className="group absolute -translate-x-1/2 -translate-y-full cursor-pointer"
      style={{
        left: `${location.coordinates.x}%`,
        top: `${location.coordinates.y}%`,
      }}
    >
      {/* Tooltip on hover */}
      <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 rounded-lg bg-white px-3 py-1.5 whitespace-nowrap opacity-0 shadow-lg transition-opacity lg:group-hover:opacity-100">
        <span className="text-eco-neutral-800 text-xs font-bold">
          {location.name}
        </span>
      </div>

      {/* Pin */}
      <div
        className={`relative flex h-10 w-10 items-center justify-center rounded-full border-4 border-white shadow-lg transition-transform hover:scale-110 sm:h-12 sm:w-12 ${isBox ? "bg-eco-primary-500" : "bg-eco-secondary-400"}`}
      >
        {isBox ? (
          <PackageOpen className="h-5 w-5 text-white sm:h-6 sm:w-6" />
        ) : (
          <Store className="h-5 w-5 text-white sm:h-6 sm:w-6" />
        )}
        {/* Pin Point */}
        <div
          className={`absolute -bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 ${isBox ? "bg-eco-primary-500" : "bg-eco-secondary-400"}`}
        />
      </div>

      {/* Shadow */}
      <div className="absolute -bottom-3 left-1/2 h-2 w-8 -translate-x-1/2 rounded-full bg-black/10 blur-[2px]" />
    </div>
  );
}
