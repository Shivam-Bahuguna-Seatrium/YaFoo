import { z } from "zod";

export const customizationSchema = z.object({
  selections: z.record(z.string(), z.array(z.string())),
  specialInstructions: z
    .string()
    .max(120, "Keep instructions under 120 characters"),
});

export type CustomizationValues = z.infer<typeof customizationSchema>;
