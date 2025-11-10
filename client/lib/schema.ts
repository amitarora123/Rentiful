import * as z from "zod";
import { PropertyTypeEnum } from "@/lib/constants";

export const propertySchema = z.object({
  name: z.string(),
  description: z.string(),
  pricePerMonth: z.number().positive().min(0).int(),
  securityDeposit: z.number().positive().min(0).int(),
  applicationFee: z.number().positive().min(0).int(),
  isPetsAllowed: z.boolean(),
  isParkingIncluded: z.boolean(),
  photoUrls: z.array(z.instanceof(File)),
  amenities: z.array(z.string()),
  highlights: z.array(z.string()),
  beds: z.number().min(0).max(10).int(),
  baths: z.number().min(0).max(10).int(),
  squareFeet: z.number().positive().int(),
  propertyType: z.enum(PropertyTypeEnum),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postalCode: z.string(),
  longitude: z.number().optional(),
  latitude: z.number().optional()
});

export type PropertyFormData = z.infer<typeof propertySchema>;

export const applicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().optional(),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;

export const settingsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;
