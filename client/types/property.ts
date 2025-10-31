export interface PropertyCoordinates {
  id: number;
  longitude: number;
  latitude: number;
  name: string;
  pricePerMonth: number;
}

export type Place = {
  id: string;
  center: [number, number];
  place_name: string;
};

export type Property = {
  id: number;
  name: string;
  address: Address;
  features: Array<string>;
  ratings: number;
  reviews: number;
  pricePerNight: number;
  beds: number;
  baths: number;
  poolAvailable: boolean;
  imageUrls: [string, string, string, string, string];
  managerId: number;
};

export type Address = {
  state: string;
  city: string;
  country: string;
  coordinates: Coordinates;
};

export type Coordinates = {
  longitude: number;
  latitude: number;
};
