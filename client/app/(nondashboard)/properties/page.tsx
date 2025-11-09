"use client";

import MapBox from "@/components/map";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Filters, setFilters } from "@/store/feature/filterSlice";
import { useEffect } from "react";

import Listings from "../components/Listing";
import { Button } from "@/components/ui/button";
import { debounce } from "lodash";
import { cleanParams } from "@/lib/utils";
import { useMap } from "@/context/map-context";
import { useGetPropertiesQuery } from "@/store/api";

export default function Page() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { flyTo } = useMap();
  const { filters } = useAppSelector((state) => state.filter);
  const { data } = useGetPropertiesQuery(filters);

  const name = searchParams.get("location");
  const lng = Number(searchParams.get("lng"));
  const lat = Number(searchParams.get("lat"));

  useEffect(() => {
    if (!name || name === "undefined" || isNaN(lng) || isNaN(lat)) {
      console.log("Please Provide Valid values for location");
      return;
    }
    const location = { name, lng, lat };

    dispatch(setFilters({ location }));
  }, [name, lng, lat, dispatch]);

  const updateURL = debounce((newFilters: Filters) => {
    const cleanFilters = cleanParams(newFilters);
    const updatedSearchParams = new URLSearchParams();

    Object.entries(cleanFilters).forEach(([key, value]) => {
      if (key === "location") {
        updatedSearchParams.set("location", value.name);
        updatedSearchParams.set("lng", value.lng);
        updatedSearchParams.set("lat", value.lat);

        flyTo([value.lng, value.lat]);
      } else {
        updatedSearchParams.set(
          key,
          Array.isArray(value) ? value.join(",") : value.toString()
        );
      }
    });

    router.push(`${pathname}?${updatedSearchParams.toString()}`);
  });

  const takeToNextPage = async () => {
    const newFilters = { ...filters, page: String(Number(filters.page) + 1) };
    dispatch(setFilters(newFilters));

    updateURL(newFilters);
  };

  const takeToPrevPage = async () => {
    const newFilters = { ...filters, page: String(Number(filters.page) - 1) };
    dispatch(setFilters(newFilters));
    updateURL(newFilters);
  };
  return (
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      <div className="col-span-1 lg:col-span-2 p-4">
        <MapBox />
      </div>
      <div className="col-span-1 h-full max-sm:px-5 sm:max-h-screen sm:overflow-y-auto">
        <Listings />
        <div className="flex justify-between items-center my-5">
          <Button
            disabled={filters.page === "1"}
            onClick={() => takeToPrevPage()}
          >
            Prev
          </Button>
          <Button
            disabled={
              data ? data?.pagination.page === data?.pagination.totalPage : true
            }
            onClick={() => takeToNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
