import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface Location {
  name: string;
  lng: number;
  lat: number;
}

interface FilterState {
  location: Location;
}

const initialState: FilterState = {
  location: {
    name: "",
    lng: 0,
    lat: 0,
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Location>) => {
      state.location = action.payload;
    },
  },
});

export const { setLocation } = filterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLocation = (state: RootState) => state.filter.location;

export default filterSlice.reducer;
