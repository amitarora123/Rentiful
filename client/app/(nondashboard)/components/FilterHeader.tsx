/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Search, Grid, List } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import MapSearch from "@/components/MapSearch";
import { cleanParams, cn, formatPriceValue } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyTypeIcons } from "@/lib/constants";
import { Filters, setFilters, setViewMode } from "@/store/feature/filterSlice";
import { usePathname, useRouter } from "next/navigation";
import { debounce } from "lodash";
import { useMap } from "@/context/map-context";

export default function FilterHeader() {
  const { viewMode, filters } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { flyTo } = useMap();
  const router = useRouter();

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
  const handleFilterChange = (
    key: string,
    value: any,
    isMin: boolean | null
  ) => {
    let newValue = value;

    if (key === "priceRange" || key === "squareFeet") {
      const currentArrayRange = [...filters[key]];
      if (isMin !== null) {
        const index = isMin ? 0 : 1;
        currentArrayRange[index] = value === "any" ? null : Number(value);
      }
      newValue = currentArrayRange;
    } else if (key === "coordinates") {
      newValue = value === "any" ? [0, 0] : value.map(Number);
    } else {
      newValue = value === "any" ? "any" : value;
    }

    const newFilters = { ...filters, [key]: newValue };
    dispatch(setFilters(newFilters));
    updateURL(newFilters);
  };
  return (
    <div className="flex flex-wrap items-center gap-2 p-3  rounded-full  bg-white">
      {/* Sidebar Trigger */}
      <SidebarTrigger />

      {/* Search Box */}
      <div className="flex relative items-center">
        <MapSearch />

        <Button
          onClick={() => updateURL(filters)}
          className="absolute right-0 rounded-l-none"
        >
          <Search className=" text-white " size={16} />
        </Button>
      </div>

      {/* Filter Buttons
      <Button
        variant="outline"
        className="rounded-full flex items-center gap-1"
      >
        Price <ChevronDown size={14} />
      </Button>

      <Button
        variant="outline"
        className="rounded-full flex items-center gap-1"
      >
        Beds/Baths <ChevronDown size={14} />
      </Button>

      <Button
        variant="outline"
        className="rounded-full flex items-center gap-1"
      >
        Home Type <ChevronDown size={14} />
      </Button>

      <Button
        variant="outline"
        className="rounded-full flex items-center gap-1"
      >
        Specialty Housing <ChevronDown size={14} />
      </Button>

      <Button
        variant="outline"
        className="rounded-full flex items-center gap-1"
      >
        Move-In Date <ChevronDown size={14} />
      </Button> */}

      {/* Sort Button */}
      {/* <Button
        variant="outline"
        className="rounded-full flex items-center gap-1"
      >
        Sort <ArrowUpDown size={14} />
      </Button> */}

      {/* Price Range */}
      <div className="flex gap-1">
        {/* Minimum Price Selector */}
        <Select
          value={filters.priceRange[0]?.toString() || "any"}
          onValueChange={(value) =>
            handleFilterChange("priceRange", value, true)
          }
        >
          <SelectTrigger className="w-fit rounded-xl border-primary-400">
            <SelectValue>
              {formatPriceValue(filters.priceRange[0], true)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-white w-fit">
            <SelectItem value="any">Any Min Price</SelectItem>
            {[500, 1000, 1500, 2000, 3000, 5000, 10000].map((price) => (
              <SelectItem key={price} value={price.toString()}>
                ${price / 1000}k+
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Maximum Price Selector */}
        <Select
          value={filters.priceRange[1]?.toString() || "any"}
          onValueChange={(value) =>
            handleFilterChange("priceRange", value, false)
          }
        >
          <SelectTrigger className="w-fit rounded-xl border-primary-400">
            <SelectValue>
              {formatPriceValue(filters.priceRange[1], false)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="any">Any Max Price</SelectItem>
            {[1000, 2000, 3000, 5000, 10000].map((price) => (
              <SelectItem key={price} value={price.toString()}>
                &lt;${price / 1000}k
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Beds and Baths */}
      <div className="flex gap-1">
        {/* Beds */}
        <Select
          value={filters.beds}
          onValueChange={(value) => handleFilterChange("beds", value, null)}
        >
          <SelectTrigger className="w-26 rounded-xl border-primary-400">
            <SelectValue placeholder="Beds" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="any">Any Beds</SelectItem>
            <SelectItem value="1">1+ bed</SelectItem>
            <SelectItem value="2">2+ beds</SelectItem>
            <SelectItem value="3">3+ beds</SelectItem>
            <SelectItem value="4">4+ beds</SelectItem>
          </SelectContent>
        </Select>

        {/* Baths */}
        <Select
          value={filters.baths}
          onValueChange={(value) => handleFilterChange("baths", value, null)}
        >
          <SelectTrigger className="w-26 rounded-xl border-primary-400">
            <SelectValue placeholder="Baths" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="any">Any Baths</SelectItem>
            <SelectItem value="1">1+ bath</SelectItem>
            <SelectItem value="2">2+ baths</SelectItem>
            <SelectItem value="3">3+ baths</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Property Type */}
      <Select
        value={filters.propertyType || "any"}
        onValueChange={(value) =>
          handleFilterChange("propertyType", value, null)
        }
      >
        <SelectTrigger className="w-32 rounded-xl border-primary-400">
          <SelectValue placeholder="Home Type" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="any">Any Property Type</SelectItem>
          {Object.entries(PropertyTypeIcons).map(([type, Icon]) => (
            <SelectItem key={type} value={type}>
              <div className="flex items-center">
                <Icon className="w-4 h-4 mr-2" />
                <span>{type}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* View Mode */}
      <div className="flex justify-between items-center gap-4 p-2">
        <div className="flex border rounded-xl">
          <Button
            variant="ghost"
            className={cn(
              "px-3 py-1 rounded-none rounded-l-xl hover:bg-primary-600 hover:text-primary-50",
              viewMode === "list" ? "bg-primary-700 text-primary-50" : ""
            )}
            onClick={() => dispatch(setViewMode("list"))}
          >
            <List className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "px-3 py-1 rounded-none rounded-r-xl hover:bg-primary-600 hover:text-primary-50",
              viewMode === "grid" ? "bg-primary-700 text-primary-50" : ""
            )}
            onClick={() => dispatch(setViewMode("grid"))}
          >
            <Grid className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
