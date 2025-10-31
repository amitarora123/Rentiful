"use client";

import { createContext, useContext, useState } from "react";
import mapboxgl from "mapbox-gl";

interface MapContextType {
  map: mapboxgl.Map | null;
  setMap: (map: mapboxgl.Map) => void;
  flyTo: (coords: [number, number], zoom?: number) => void;
}

const MapContext = createContext<MapContextType | null>(null);

export const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const [mapState, setMapState] = useState<mapboxgl.Map | null>(null);

  const setMap = (mapInstance: mapboxgl.Map) => {
    // Prevent infinite re-renders:
    if (mapState !== mapInstance) {
      setMapState(mapInstance);
    }
  };

  const flyTo = (coords: [number, number], zoom = 12) => {
    if (mapState) {
      mapState.flyTo({
        center: coords,
        zoom,
        essential: true,
      });
    }
  };

  return (
    <MapContext.Provider value={{ map: mapState, setMap, flyTo }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const ctx = useContext(MapContext);
  if (!ctx) throw new Error("useMap must be used inside MapProvider");
  return ctx;
};
