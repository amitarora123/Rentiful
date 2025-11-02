import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Amenity, PropertyType } from "@/types/prismaTypes";

interface Location {
  name: string;
  lng: number;
  lat: number;
}
export interface Filters {
  location: Location | null;
  propertyType: PropertyType | null;
  priceRange: [number, number] | [null, null];
  beds: string;
  baths: string;
  availableFrom: string;
  squareFeet: [number, number] | [null, null];
  amenities: Amenity[];
}

export interface FilterState {
  isFiltersFullOpen: boolean;
  viewMode: "grid" | "list";
  filters: Filters;
}

const initialState: FilterState = {
  filters: {
    location: null,
    propertyType: null,
    priceRange: [null, null],
    squareFeet: [null, null],
    availableFrom: "any",
    baths: "any",
    beds: "any",
    amenities: [],
  },
  viewMode: "grid",
  isFiltersFullOpen: false,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<Filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    toggleFiltersFullOpen: (state) => {
      state.isFiltersFullOpen = !state.isFiltersFullOpen;
    },
    setViewMode: (state, action: PayloadAction<"grid" | "list">) => {
      state.viewMode = action.payload;
    },
  },
});

export const { setFilters, toggleFiltersFullOpen, setViewMode } =
  filterSlice.actions;

export default filterSlice.reducer;
