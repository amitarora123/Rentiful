"use client";

import { useState, useEffect, useRef } from "react";
import { useMap } from "@/context/map-context";
import { Input } from "./ui/input";
import { Place } from "@/types/property";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFilters } from "@/store/feature/filterSlice";

const mapBoxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function MapSearch() {
  const location = useAppSelector((state) => state.filter.filters.location);
  const [query, setQuery] = useState(location?.name || "");
  const [results, setResults] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const isUserTyping = useRef(false);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    isUserTyping.current = true;
    setQuery(e.target.value);
  }

  useEffect(() => {
    if (!isUserTyping.current) return;

    const handler = setTimeout(() => {
      if (query.trim().length > 2) fetchPlaces(query);
      else setResults([]);
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  async function fetchPlaces(q: string) {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          q
        )}.json?access_token=${mapBoxAccessToken}&autocomplete=true&limit=5`
      );
      const data = await res.json();
      setResults(data.features || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <div className="relative w-full">
      <Input
        value={query}
        onChange={handleInputChange}
        placeholder="Culver City, CA"
        className="w-full px-4 py-2 ring-0 focus-visible:ring-0 focus-visible:outline-0 border focus:ring-0 border-primary-700 outline-none shadow-sm"
      />
      {loading && (
        <span className="absolute right-3 top-2 text-gray-400 text-sm">
          ...
        </span>
      )}
      {results.length > 0 && (
        <ul className="absolute bg-white shadow-lg w-full mt-1 rounded-lg z-20">
          {results.map((place, index) => (
            <li
              key={place.id}
              onClick={() => {
                setResults([]);
                isUserTyping.current = false;
                setQuery(place.place_name);
                dispatch(
                  setFilters({
                    location: {
                      name: place.place_name,
                      lat: place.center[1],
                      lng: place.center[0],
                    },
                  })
                );
              }}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm ${
                index === 0 ? "rounded-t-lg" : ""
              } ${index === results.length - 1 ? "rounded-b-lg" : ""} `}
            >
              {place.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
