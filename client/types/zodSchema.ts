import * as z from "zod";

export const zodSettingsFormData = z.object({
  name: z
    .string()
    .min(2, "name must be 2 chars")
    .max(102, "name must not exceed 102 chars"),
  email: z.email("Invalid Email address"),
  phoneNumber: z
    .string()
    .min(10, "phone number must be of 10 length")
    .max(10, "phone number must be of 10 length"),
});

export type SettingsFormData = z.infer<typeof zodSettingsFormData>;
