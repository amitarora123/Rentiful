"use client";

import MapBox from "@/components/map";
import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setFilters } from "@/store/feature/filterSlice";
import { useEffect } from "react";

import Listings from "../components/Listing";

export default function Page() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const name = searchParams.get("location");
  const lng = Number(searchParams.get("lng"));
  const lat = Number(searchParams.get("lat"));

  useEffect(() => {
    if (!name || !lng || !lat) {
      console.error("Please Provide Valid values for location");
      return;
    }
    const location = { name, lng, lat };

    dispatch(setFilters({ location }));
  }, [name, lng, lat, dispatch]);

  return (
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      <div className="col-span-1 lg:col-span-2 p-4">
        <MapBox />
      </div>
      <div className="col-span-1 h-full max-sm:px-5 sm:max-h-screen sm:overflow-y-auto">
        <Listings />
      </div>
    </div>
  );
}
