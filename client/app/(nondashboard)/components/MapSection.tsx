"use client";

import { Address } from "@/types/property";
import { MapPin, Navigation } from "lucide-react";

const categories = ["Hotel", "Restaurant", "Bank", "School", "Shop", "Fitness"];

export default function MapSection({
  city,
  country,
  state,
  coordinates,
}: Address) {
  return (
    <section className="w-full mt-8">
      {/* Title */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Map and Location</h2>
        <button className="flex items-center text-sm font-medium text-gray-700 hover:text-primary">
          <Navigation className="w-4 h-4 mr-1" />
          Get Directions
        </button>
      </div>

      {/* Address */}
      <div className="flex items-start gap-2 text-gray-700 text-sm mb-3">
        <MapPin className="w-4 h-4 mt-[2px] text-gray-500 shrink-0" />
        <p>
          <span className="font-medium">Property Address:</span>{" "}
          <span className="text-gray-800">
            {/* Kuta Selatan, Bali, Indonesia, Post Code 90501 */}
            {city}, {state}, {country}
          </span>
        </p>
      </div>

      {/* Map Container */}
      <div className="relative w-full rounded-lg overflow-hidden shadow-sm border">
        {/* Replace this with your Mapbox or Google Map embed */}
        <iframe
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.longitude}%2C${coordinates.latitude}%2C${coordinates.longitude}%2C${coordinates.latitude}&layer=mapnik`}
          className="w-full h-[400px]"
          loading="lazy"
        ></iframe>

        {/* Category Tabs */}
        <div className="absolute bottom-0 left-0 w-full bg-black/90 flex text-white">
          {categories.map((category) => (
            <button
              key={category}
              className="flex-1 py-3 text-center text-sm font-medium border-r border-white/10 hover:bg-black/70 transition"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
