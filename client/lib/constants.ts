import { Lease, LeaseStatus } from "@/types/lease";
import { Property } from "@/types/property";
import { Manager } from "@/types/user";

export const demoProperties: Property[] = [
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
    managerId: 1,
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
    managerId: 1,
    poolAvailable: false,
    imageUrls: [
      "/property-image-0.jpg",
      "/property-image-1.jpg",
      "/property-image-2.jpg",
      "/property-image-3.jpg",
      "/property-image-4.jpg",
    ],
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
    managerId: 1,
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
    managerId: 1,
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
  },
  {
    id: 5,
    name: "Sobha City Gurgaon",
    managerId: 1,
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
  },
];

export const managers: Manager[] = [
  {
    id: 1,
    email: "amit@rentiful.com",
    name: "Amit Baghla",
    phoneNo: "+91 1234567890",
    propertyIds: [1, 2, 3, 4, 5, 6],
    imageUrl: "/manager.webp"
  },
];

export const leases: Lease[] = [
  {
    id: 1,
    propertyId: 1,
    startDate: "08 / 09 / 2024",
    endDate: "10 / 09 / 2024",
    status: LeaseStatus.ACTIVE,
  },
  {
    id: 2,
    propertyId: 2,
    startDate: "08 / 09 / 2024",
    endDate: "10 / 09 / 2024",
    status: LeaseStatus.PENDING,
  },
  {
    id: 3,
    propertyId: 3,
    startDate: "08 / 09 / 2024",
    endDate: "10 / 09 / 2024",
    status: LeaseStatus.INACTIVE,
  },
];

export const favoritePropertiesIds: number[] = [1, 3, 5];
