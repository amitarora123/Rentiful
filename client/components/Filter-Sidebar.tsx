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
  Tv,
  Accessibility,
  PawPrint,
  Wifi,
  Waves,
  Mountain,
  Bath,
  Search,
} from "lucide-react";
import { useRef, useState } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import MapSearch from "./MapSearch";

const propertyTypes = [
  { name: "Rooms", icon: Home },
  { name: "Tinyhouse", icon: Building2 },
  { name: "Apartment", icon: Hotel },
  { name: "Villa", icon: Castle },
  { name: "Townhouse", icon: Warehouse },
  { name: "Cottage", icon: Trees },
];

const conveniences = [
  { name: "TV", icon: Tv },
  { name: "Disabled Access", icon: Accessibility },
  { name: "In the woods", icon: Trees },
  { name: "Hot Tubs", icon: Bath },
  { name: "Views", icon: Mountain },
  { name: "Lake & Rivers", icon: Waves },
  { name: "Pet Friendly", icon: PawPrint },
  { name: "Wifi", icon: Wifi },
];

export default function PropertyFilterSidebar() {
  const [selectedType, setSelectedType] = useState("Rooms");
  const [priceRange, setPriceRange] = useState([200, 1200]);
  const [selectedConveniences, setSelectedConveniences] = useState<string[]>(
    []
  );

  const [propertySize, setPropertySize] = useState([0, 5000]);

  const toggleConvenience = (name: string) => {
    setSelectedConveniences((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

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
                <MapSearch />
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
                    onClick={() => setSelectedType(type.name)}
                    className={`flex flex-col items-center justify-center h-24 border rounded-xl cursor-pointer transition ${
                      type.name === selectedType
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
              value={priceRange}
              onValueChange={setPriceRange}
              className="mt-3"
            />
            <div className="flex justify-between mt-3 text-sm font-medium">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Beds And Baths Filter */}
        <SidebarGroup className="flex gap-2 items-center flex-row">
          <div>
            <SidebarGroupLabel className="font-bold my-2 text-sm">
              Beds
            </SidebarGroupLabel>
            <Select>
              <SelectTrigger className="">
                <SelectValue placeholder="Any Beds" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <SidebarGroupLabel className="font-bold my-2 text-sm">
              Baths
            </SidebarGroupLabel>
            <Select>
              <SelectTrigger className="">
                <SelectValue placeholder="Any Baths" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
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
              max={5000}
              step={50}
              value={propertySize}
              onValueChange={setPropertySize}
              className="mt-3"
            />
            <div className="flex justify-between mt-3 text-sm font-medium">
              <span className="text-xs">{propertySize[0]} sq ft</span>
              <span className="text-xs">{propertySize[1]} sq ft</span>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Conveniences */}
        <SidebarGroup>
          <SidebarGroupLabel>Conveniences</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex flex-wrap gap-2">
              {conveniences.map((c) => (
                <div
                  key={c.name}
                  onClick={() => toggleConvenience(c.name)}
                  className={`flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition ${
                    selectedConveniences.includes(c.name)
                      ? "bg-gray-100 border-black"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <c.icon className="size-4" />
                  <span className="text-sm">{c.name}</span>
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
            <Input type="date" />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="font-bold">
            Available To
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Input type="date" />
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Apply Button */}
        <div className="flex items-center justify-center gap-3">
          <Button>APPLY</Button>
          <Button className="border border-black" variant="ghost" type="reset">
            Reset Filters
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
