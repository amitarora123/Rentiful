import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { demoProperties, managers } from "./constants";
import { Address } from "@/types/property";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPropertyDetails = (propertyId: number) => {
  const property = demoProperties.find((p) => p.id === propertyId)!;
  const managerId = property!.managerId;
  const manager = managers.find((m) => m.id === managerId)!;

  return { property, manager };
};

export const formatAddress = ({ country, city, state }: Address) => {
  return `${city}, ${state}, ${country}`;
};
