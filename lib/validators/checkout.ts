import { z } from "zod";

export const checkoutSchema = z.object({
  pickupInstructions: z
    .string()
    .max(120, "Keep pickup instructions under 120 characters"),
  paymentMethod: z.enum(["demo-card", "demo-upi", "pay-at-pickup"]),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;
