"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Home,
  Building2,
  Hotel,
  Castle,
  Warehouse,
  Trees,
  LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { debounce } from "lodash";
import { Filters, setFilters } from "@/store/feature/filterSlice";
import { cleanParams } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { PropertyType } from "@/types/prismaTypes";
import { AmenityIcons } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Place } from "@/types/property";
import { useMap } from "@/context/map-context";

const propertyTypes: {
  name: PropertyType;
  icon: LucideIcon;
}[] = [
  { name: "Rooms", icon: Home },
  { name: "Tinyhouse", icon: Building2 },
  { name: "Apartment", icon: Hotel },
  { name: "Villa", icon: Castle },
  { name: "Townhouse", icon: Warehouse },
  { name: "Cottage", icon: Trees },
];

export default function PropertyFilterSidebar() {
  const { filters } = useAppSelector((state) => state.filter);
  const [localFilters, setLocalFilters] = useState(filters);

  const { flyTo } = useMap();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

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

  const handleSubmit = () => {
    const updatedFilters = { ...filters, ...localFilters };

    dispatch(setFilters(updatedFilters));
    updateURL(updatedFilters);
  };

  const handleReset = () => {
    setLocalFilters(filters);
    dispatch(setFilters(filters));
    updateURL(filters);
  };

  const handleAmenityChange = (amenity: AmenityEnum) => {
    setLocalFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const mapBoxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

  const [query, setQuery] = useState(localFilters.location?.name || "");
  const [results, setResults] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <Sidebar className=" border-r bg-white pt-15">
      <SidebarContent className=" space-y-2 p-4">
        {/* Property Type */}

        <SidebarGroup>
          <SidebarGroupLabel className="font-bold my-2 text-sm">
            Location
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="flex">
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
                            setLocalFilters({
                              ...localFilters,
                              location: {
                                name: place.place_name,
                                lng: place.center[0],
                                lat: place.center[1],
                              },
                            });
                          }}
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
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold my-2 text-sm">
            Property Type
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="grid grid-cols-2 gap-3">
              {propertyTypes.map((type) => (
                <SidebarMenuItem key={type.name}>
                  <div
                    onClick={() => {
                      setLocalFilters((prev) => ({
                        ...prev,
                        propertyType: type.name,
                      }));
                    }}
                    className={`flex flex-col items-center justify-center h-24 border rounded-xl cursor-pointer transition ${
                      type.name === localFilters.propertyType
                        ? "border-black bg-gray-100"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <type.icon className="size-8" strokeWidth={1.25} />
                    <span className="text-sm mt-2">{type.name}</span>
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Price Range */}
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold ">
            Price Range (Monthly)
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Slider
              min={100}
              max={2000}
              step={50}
              value={
                [
                  localFilters.priceRange[0] ?? 100,
                  localFilters.priceRange[1] ?? 2000,
                ] as number[]
              }
              onValueChange={(v) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  priceRange: v as [number, number],
                }))
              }
              className="mt-3"
            />
            <div className="flex justify-between mt-3 text-sm font-medium">
              <span>${localFilters.priceRange[0] || 100}</span>
              <span>${localFilters.priceRange[1] || 2000}</span>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Beds And Baths Filter */}
        <SidebarGroup className="flex gap-2 items-center flex-row">
          <div>
            <SidebarGroupLabel className="font-bold my-2 text-sm">
              Beds
            </SidebarGroupLabel>
            <Select
              value={localFilters.beds || "any"}
              onValueChange={(value) =>
                setLocalFilters((prev) => ({ ...prev, beds: value }))
              }
            >
              <SelectTrigger className="w-full rounded-xl">
                <SelectValue placeholder="Beds" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any beds</SelectItem>
                <SelectItem value="1">1+ bed</SelectItem>
                <SelectItem value="2">2+ beds</SelectItem>
                <SelectItem value="3">3+ beds</SelectItem>
                <SelectItem value="4">4+ beds</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <SidebarGroupLabel className="font-bold my-2 text-sm">
              Baths
            </SidebarGroupLabel>
            <Select
              value={localFilters.baths || "any"}
              onValueChange={(value) =>
                setLocalFilters((prev) => ({ ...prev, baths: value }))
              }
            >
              <SelectTrigger className="w-full rounded-xl">
                <SelectValue placeholder="Baths" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any baths</SelectItem>
                <SelectItem value="1">1+ bath</SelectItem>
                <SelectItem value="2">2+ baths</SelectItem>
                <SelectItem value="3">3+ baths</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </SidebarGroup>

        {/* Property Size Filter */}
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold ">
            Square Feet
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Slider
              min={100}
              max={10000}
              step={50}
              value={[
                localFilters.squareFeet[0] ?? 0,
                localFilters.squareFeet[1] ?? 10000,
              ]}
              onValueChange={(v) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  squareFeet: [v[0], v[1]],
                }))
              }
              className="mt-3"
            />
            <div className="flex justify-between mt-3 text-sm font-medium">
              <span className="text-xs">
                {localFilters.squareFeet[0] ?? 0} sq ft
              </span>
              <span className="text-xs">
                {localFilters.squareFeet[1] ?? 10000} sq ft
              </span>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Conveniences */}
        <SidebarGroup>
          <SidebarGroupLabel>Amenities</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex flex-wrap gap-2">
              {Object.entries(AmenityIcons).map(([amenity, Icon]) => (
                <div
                  key={amenity}
                  onClick={() => handleAmenityChange(amenity as AmenityEnum)}
                  className={`flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition ${
                    localFilters.amenities.includes(amenity as AmenityEnum)
                      ? "bg-gray-100 border-black"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="size-4" />
                  <span className="text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="font-bold">
            Available From
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Input
              type="date"
              onChange={(e) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  availableFrom: e.target.value,
                }))
              }
            />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="font-bold">
            Available To
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Input
              type="date"
              onChange={(e) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  availableFrom: e.target.value,
                }))
              }
            />
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Apply Button */}
        <div className="flex items-center justify-center gap-3">
          <Button onClick={() => handleSubmit()}>APPLY</Button>
          <Button
            onClick={() => handleReset()}
            className="border border-black"
            variant="ghost"
            type="reset"
          >
            Reset Filters
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
