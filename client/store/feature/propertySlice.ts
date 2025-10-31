import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Property } from "@/types/property";

interface PropertiesState {
  properties: Property[];
  favoritePropertyIds: number[];
}

const initialState: PropertiesState = {
  properties: [
    {
      id: 1,
      name: "Prestige Lakeside Habitat",
      address: {
        city: "Bangalore",
        state: "Karnataka",
        country: "India",
        coordinates: {
          latitude: 12.9279,
          longitude: 77.6271,
        },
      },
      managerId: 1,
      features: [
        "Lake View",
        "Gym",
        "Clubhouse",
        "High Speed Internet Access",
        "Smoke Free",
        "Tub/Shower",
        "Washer/Dryer",
        "Cable Ready",
        "Intercom",
        "Air Conditioning",
        "Satellite TV",
        "Sprinkler System",
      ],
      ratings: 4.5,
      reviews: 120,
      pricePerNight: 2500,
      beds: 3,
      baths: 2,
      poolAvailable: true,
      imageUrls: [
        "/property-image-0.jpg",
        "/property-image-1.jpg",
        "/property-image-2.jpg",
        "/property-image-3.jpg",
        "/property-image-4.jpg",
      ],
    },

    {
      id: 2,
      name: "DLF Cyber City Apartment",
      address: {
        city: "Gurgaon",
        state: "Haryana",
        country: "India",
        coordinates: {
          latitude: 28.495,
          longitude: 77.0833,
        },
      },
      features: ["City View", "Security", "Parking"],
      ratings: 4.2,
      reviews: 98,
      pricePerNight: 3200,
      beds: 2,
      baths: 2,
      poolAvailable: false,
      imageUrls: [
        "/property-image-0.jpg",
        "/property-image-1.jpg",
        "/property-image-2.jpg",
        "/property-image-3.jpg",
        "/property-image-4.jpg",
      ],
      managerId: 1,
    },
    {
      id: 3,
      name: "Godrej Woods Noida",
      address: {
        city: "Noida",
        state: "Uttar Pradesh",
        country: "India",
        coordinates: {
          latitude: 28.5672,
          longitude: 77.3269,
        },
      },
      features: ["Garden", "Play Area", "Gym"],
      ratings: 4.6,
      reviews: 110,
      pricePerNight: 2800,
      beds: 3,
      baths: 2,
      poolAvailable: true,
      imageUrls: [
        "/property-image-0.jpg",
        "/property-image-1.jpg",
        "/property-image-2.jpg",
        "/property-image-3.jpg",
        "/property-image-4.jpg",
      ],
      managerId: 1,
    },
    {
      id: 4,
      name: "Kumar Prospera Pune",
      address: {
        city: "Pune",
        state: "Maharashtra",
        country: "India",
        coordinates: {
          latitude: 18.5196,
          longitude: 73.8553,
        },
      },
      features: ["Clubhouse", "Jogging Track", "Security"],
      ratings: 4.3,
      reviews: 85,
      pricePerNight: 2100,
      beds: 2,
      baths: 2,
      poolAvailable: false,
      imageUrls: [
        "/property-image-0.jpg",
        "/property-image-1.jpg",
        "/property-image-2.jpg",
        "/property-image-3.jpg",
        "/property-image-4.jpg",
      ],
      managerId: 1,
    },
    {
      id: 5,
      name: "Sobha City Gurgaon",
      address: {
        city: "Gurgaon",
        state: "Haryana",
        country: "India",
        coordinates: {
          latitude: 28.4744,
          longitude: 77.0647,
        },
      },
      features: ["Swimming Pool", "Gym", "Tennis Court"],
      ratings: 4.7,
      reviews: 140,
      pricePerNight: 3500,
      beds: 4,
      baths: 3,
      poolAvailable: true,
      imageUrls: [
        "/property-image-0.jpg",
        "/property-image-1.jpg",
        "/property-image-2.jpg",
        "/property-image-3.jpg",
        "/property-image-4.jpg",
      ],
      managerId: 1,
    },
  ],
  favoritePropertyIds: [1, 2, 3, 4, 5],
};

export const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<number>) => {
      state.favoritePropertyIds.push(action.payload);
    },
    removeFromFavorite: (state, action: PayloadAction<number>) => {
      state.favoritePropertyIds = state.favoritePropertyIds.filter(
        (id) => id != action.payload
      );
    },
    fetchProperties: (state) => {
      
    }

  },
});

export const { addToFavorite, removeFromFavorite } = propertySlice.actions;

export default propertySlice.reducer;
