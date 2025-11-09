"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMap } from "@/context/map-context";
import { Property } from "@/types/prismaTypes";
import { useGetPropertiesQuery } from "@/store/api";
import { useAppSelector } from "@/store/hooks";

const mapBoxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function MapBox() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const { setMap, map } = useMap();

  const { filters } = useAppSelector((state) => state.filter);
  const { data } = useGetPropertiesQuery(filters);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/amitbaghla123/cmcwugfgj003801s91fki8gt3",
      center: [
        filters.location?.lng ?? -79.153346,
        filters.location?.lat ?? 40.622948,
      ],
      zoom: 4,
      accessToken: mapBoxAccessToken,
    });

    setMap(mapInstance);

    const resizeMap = () => setTimeout(() => mapInstance.resize(), 700);
    resizeMap();

    return () => mapInstance.remove();
  }, []);

  // Handle markers whenever data changes
  useEffect(() => {
    if (!map || !data?.properties) return;

    // Remove old markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new markers
    data.properties.forEach((property) => {
      const marker = createPropertyMarker(property, map);
      const markerElement = marker.getElement();
      const path = markerElement.querySelector("path[fill='#3FB1CE']");
      if (path) path.setAttribute("fill", "#000000");

      markersRef.current.push(marker);
    });
  }, [map, data?.properties]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-[500px] rounded-xl overflow-hidden"
    />
  );
}
const createPropertyMarker = (property: Property, map: mapboxgl.Map) => {
  const marker = new mapboxgl.Marker()
    .setLngLat([
      property.location!.coordinates.longitude,
      property.location!.coordinates.latitude,
    ])
    .setPopup(
      new mapboxgl.Popup({
        className: "property-popup",
        closeButton: false,
      }).setHTML(`
        <div class="p-2 text-white">
          <div class="flex gap-2 items-center p-1 rounded-lg bg-black/70">
            <img src="${
              property.photoUrls?.length
                ? property.photoUrls[0]
                : "/property-image-0.jpg"
            }" alt="${
        property.name
      }" class="w-8 h-8 object-cover object-center rounded-sm"/>
            <div >
              <p>${property.name} </p>
              <p> $<span class="font-bold">${
                property.pricePerMonth
              } night</span> </p>
            </div>
          </div>
        </div>
      `)
    )
    .addTo(map);
  return marker;
};
