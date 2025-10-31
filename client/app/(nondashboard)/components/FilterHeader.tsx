"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  ChevronDown,
  Search,
  ArrowUpDown,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import MapSearch from "@/components/MapSearch";

export default function FilterHeader() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-2 p-3  rounded-full  bg-white">
      {/* Sidebar Trigger */}
      <SidebarTrigger />

      {/* Search Box */}
      <div className="relative flex items-center">
        <MapSearch />
        <Search className="absolute right-3 text-gray-500" size={16} />
      </div>

      {/* Filter Buttons */}
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
      </Button>

      {/* Sort Button */}
      <Button
        variant="outline"
        className="rounded-full flex items-center gap-1"
      >
        Sort <ArrowUpDown size={14} />
      </Button>
    </div>
  );
}
