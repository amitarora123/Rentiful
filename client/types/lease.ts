export interface Lease {
  id: number;
  propertyId: number;
  status: LeaseStatus;
  startDate: string;
  endDate: string;
}

export enum LeaseStatus {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
  INACTIVE = "INACTIVE",
}
