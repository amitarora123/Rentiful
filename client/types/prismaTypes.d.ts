// shared/types/models.ts

// Enums
export type Highlight =
  | "HighSpeedInternetAccess"
  | "WasherDryer"
  | "AirConditioning"
  | "Heating"
  | "SmokeFree"
  | "CableReady"
  | "SatelliteTV"
  | "DoubleVanities"
  | "TubShower"
  | "Intercom"
  | "SprinklerSystem"
  | "RecentlyRenovated"
  | "CloseToTransit"
  | "GreatView"
  | "QuietNeighborhood";

export type Amenity =
  | "WasherDryer"
  | "AirConditioning"
  | "Dishwasher"
  | "HighSpeedInternet"
  | "HardwoodFloors"
  | "WalkInClosets"
  | "Microwave"
  | "Refrigerator"
  | "Pool"
  | "Gym"
  | "Parking"
  | "PetsAllowed"
  | "WiFi";

export type PropertyType =
  | "Rooms"
  | "Tinyhouse"
  | "Apartment"
  | "Villa"
  | "Townhouse"
  | "Cottage";

export type ApplicationStatus = "Pending" | "Denied" | "Approved";

export type PaymentStatus = "Pending" | "Paid" | "PartiallyPaid" | "Overdue";

// Models
export type Tenant = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  cognitoId: string;

  favorites?: Property[];
  applications?: Application[];
  leases?: Lease[];
  properties?: Property[];
};

export type Manager = {
  id: number;
  cognitoId: string;
  name: string;
  email: string;
  phoneNumber: string;

  propertyIds?: number[];
};

export type Location = {
  id: number;
  city: string;
  address: string;
  state: string;
  country: string;
  postalCode: string;
  coordinates: {
    longitude: number;
    latitude: number;
  }; // string for frontend (geo serialized)

  propertyIds?: number[];
};

export type Property = {
  id: number;
  name: string;
  description: string;
  pricePerMonth: number;
  securityDeposit: number;
  applicationFee: number;
  photoUrls: string[];
  amenities: Amenity[];
  highlights: Highlight[];
  isPetsAllowed: boolean;
  isParkingIncluded: boolean;
  beds: number;
  baths: number;
  squareFeet: number;
  propertyType: PropertyType;
  postedDate: string;
  averageRating?: number;
  numberOfReviews?: number;
  locationId: number;
  managerCognitoId: string;

  location: Location;
  manager: Manager;
  // optional arrays of IDs for relations
};

export type Application = {
  id: number;
  applicationDate: string;
  status: ApplicationStatus;
  propertyId: number;
  tenantCognitoId: string;
  name: string;
  email: string;
  phoneNumber: string;
  message?: string;
  leaseId?: number;

  property: Property;
  tenant: Tenant;
  lease: Lease;
  manager: Manager;
};

export type Lease = {
  id: number;
  startDate: string;
  endDate: string;
  rent: number;
  deposit: number;

  tenant: Tenant;
  Property: Property;
  propertyId: number;
  nextPaymentDate: string;
  tenantCognitoId: string;
  applicationId?: number;
  paymentIds?: number[];
};

export type Payment = {
  id: number;
  amountDue: number;
  amountPaid: number;
  dueDate: string;
  paymentDate: string;
  paymentStatus: PaymentStatus;
  leaseId: number;
};
