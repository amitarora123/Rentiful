"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMap } from "@/context/map-context";
import { demoProperties } from "@/lib/constants";
import { Property } from "@/types/property";

const mapBoxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function MapBox() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const { setMap } = useMap();

  useEffect(() => {
    if (!mapContainerRef.current) return; // wait until the div is rendered
    // If map already initialized, don't create again
    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/amitbaghla123/cmcwugfgj003801s91fki8gt3",
      center: [77.671, 12.9249],
      zoom: 9,
      accessToken: mapBoxAccessToken,
    });

    setMap(mapInstance);

    demoProperties.forEach((property) => {
      const marker = createPropertyMarker(property, mapInstance);
      const markerElement = marker.getElement();
      const path = markerElement.querySelector("path[fill='#3FB1CE']");
      if (path) path.setAttribute("fill", "#000000");
    });

    const resizeMap = () => setTimeout(() => mapInstance.resize(), 700);

    resizeMap();

    return () => mapInstance.remove();
  }, []);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-[500px]  rounded-xl overflow-hidden"
    />
  );
}

const createPropertyMarker = (property: Property, map: mapboxgl.Map) => {
  const marker = new mapboxgl.Marker()
    .setLngLat([
      property.address.coordinates.longitude,
      property.address.coordinates.latitude,
    ])
    .setPopup(
      new mapboxgl.Popup({
        className: "property-popup",
        closeButton: false,
      }).setHTML(`
        <div class="p-2 text-white">
          <div class="flex gap-2 items-center p-1 rounded-lg bg-black/70">
            <img src="/property-image-0.jpg" alt="${property.name}" class="w-8 h-8 object-cover object-center rounded-sm"/>
            <div >
              <p>${property.name} </p>
              <p> $<span class="font-bold">${property.pricePerNight} night</span> </p>
            </div>
          </div>
        </div>
      `)
    )
    .addTo(map);
  return marker;
};
