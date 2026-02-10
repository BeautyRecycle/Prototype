"use client";

import { MapVisual, type MapLocation } from "~/components/map/interactive-map";
import { LocationList } from "~/components/map/location-list";
import { FadeIn } from "~/components/animations/MotionPrimitives";
import { Sparkles } from "lucide-react";

const MOCK_LOCATIONS: MapLocation[] = [
  {
    id: "1",
    name: "Return Box - Central Park",
    address: "123 Park Ave, Downtown",
    type: "box",
    distance: 0.3,
    openUntil: "24/7",
    coordinates: { x: 35, y: 45 },
  },
  {
    id: "2",
    name: "GreenMart Store",
    address: "456 Main St, City Center",
    type: "store",
    distance: 0.5,
    openUntil: "9 PM",
    coordinates: { x: 62, y: 32 },
  },
  {
    id: "3",
    name: "Return Box - Shopping Mall",
    address: "789 Commerce Blvd",
    type: "box",
    distance: 0.8,
    openUntil: "24/7",
    coordinates: { x: 28, y: 28 },
  },
  {
    id: "4",
    name: "EcoShop",
    address: "321 Green Street",
    type: "store",
    distance: 1.2,
    openUntil: "8 PM",
    coordinates: { x: 80, y: 60 },
  },
];

export default function MapPage() {
  return (
    <div className="mx-auto max-w-5xl pb-12">
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-eco-primary-900 mb-2 flex items-center gap-2 text-3xl font-bold">
            Find Drop-off Locations
          </h1>
          <p className="flex items-center gap-2 font-medium text-pink-500">
            Discover the nearest return spots near you{" "}
            <Sparkles className="h-4 w-4" />
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <MapVisual locations={MOCK_LOCATIONS} />
      </FadeIn>

      <FadeIn delay={0.4}>
        <LocationList locations={MOCK_LOCATIONS} />
      </FadeIn>
    </div>
  );
}
