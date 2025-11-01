"use client";

import MapBox from "@/components/map";
import PropertyCard from "@/components/PropertyCard";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLocation } from "@/store/feature/filterSlice";
import { useEffect } from "react";
import { useGetPropertiesQuery } from "@/store/api";

export default function Page() {
  const { data } = useGetPropertiesQuery();
  console.log(data);

  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { properties } = useAppSelector((state) => state.property);

  const name = searchParams.get("query");
  const lng = Number(searchParams.get("lng"));
  const lat = Number(searchParams.get("lat"));

  useEffect(() => {
    if (!name || !lng || !lat) {
      console.error("Please Provide Valid values for location");
      return;
    }
    const location = { name, lng, lat };
    dispatch(setLocation(location));
  }, [name, lng, lat, dispatch]);

  return (
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      <div className="col-span-1 lg:col-span-2 p-4">
        <MapBox />
      </div>
      <div className="col-span-1 h-full max-sm:px-5 sm:max-h-screen sm:overflow-y-auto">
        <div className="flex flex-col gap-5">
          <p>
            <strong> 100</strong> Places in all over the world.
          </p>
          {data?.map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </div>
      </div>
    </div>
  );
}
