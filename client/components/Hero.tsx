"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Place } from "@/types/property";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";

const Hero = () => {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Place[]>([]);
  const [location, setLocation] = useState<Place | null>(null);
  const mapBoxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const isUserTyping = useRef(false);

  const fetchPlaces = useCallback(
    async (q: string) => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            q
          )}.json?access_token=${mapBoxAccessToken}&autocomplete=true&limit=5`
        );
        const data = await res.json();
        console.log(data);
        setResults(data.features || []);
      } finally {
        setLoading(false);
      }
    },
    [mapBoxAccessToken]
  );

  useEffect(() => {
    if (!isUserTyping.current) return;
    const handler = setTimeout(() => {
      if (query.trim().length > 2) fetchPlaces(query);
      else setResults([]);
    }, 500);
    return () => clearTimeout(handler);
  }, [query, fetchPlaces]);

  return (
    <div className="w-full h-screen">
      <div className="relative w-full h-full">
        <Image
          src="/hero.jpg"
          width={800}
          height={400}
          alt="Hero Image"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 w-full h-full bg-black opacity-60 backdrop-blur-lg" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3, // delay per item
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="h-full w-full absolute z-30 inset-0"
        >
          <div className="flex my-20 lg:my-40 flex-col items-center justify-between max-sm:px-10">
            <h1 className="text-white text-center font-bold text-2xl sm:text-4xl md:text-5xl ">
              Start your journey to finding the
              <br />
              perfect place to call home
            </h1>
            <p className="text-white text-center  mt-5  text-lg">
              Explore our wide range of rental properties tailored to fit your
              lifestyle and needs!
            </p>

            <div className="my-5 flex w-full max-w-xl">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Search for location, property, etc."
                  className="px-3 py-1 bg-white text-xs focus-visible:ring-0 focus-visible:outline-0  focus:border-0 rounded-none h-full   w-full"
                  value={query}
                  onChange={(e) => {
                    isUserTyping.current = true;
                    setQuery(e.target.value);
                  }}
                />

                {results.length > 0 && (
                  <ul className="absolute bg-white shadow-lg w-full mt-1 rounded-lg z-20">
                    {results.map((place, index) => (
                      <li
                        onClick={() => {
                          isUserTyping.current = false;
                          setQuery(place.place_name);
                          setLocation(place);
                          setResults([]);
                        }}
                        key={index}
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm ${
                          index === 0 ? "rounded-t-lg" : ""
                        } ${
                          index === results.length - 1 ? "rounded-b-lg" : ""
                        } `}
                      >
                        {place.place_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <Link
                prefetch
                onClick={() => setResults([])}
                href={
                  location?.center && location.place_name && location.id
                    ? `/properties?location=${encodeURIComponent(
                        location.place_name
                      )}&lng=${location.center[0]}&lat=${location.center[1]}`
                    : "/properties"
                }
                className="bg-secondary-500 text-white px-3 py-2 w-fit "
              >
                {loading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  "Search"
                )}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
