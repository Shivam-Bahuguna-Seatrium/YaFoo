import { z } from "zod";

export const destinationSetupSchema = z
  .object({
    destinationType: z.enum(["office", "home", "other"]),
    destinationId: z.string().min(1, "Choose where to receive your meal"),
    destinationLabel: z.string().trim().min(1, "Add a destination label"),
    deliveryWindowId: z.string().min(1, "Choose a delivery window"),
    purchaseMode: z.enum(["one-time", "plan"]),
  });

export const destinationCartSchema = z
  .object({
    destinationId: z.string().min(1),
    destinationLabel: z.string().trim().min(1),
    deliveryWindowId: z.string().min(1),
    purchaseMode: z.enum(["one-time", "plan"]),
    mealId: z.string().nullable(),
    planId: z.string().nullable(),
    quantity: z.number().int().min(1).max(9),
    paymentMethod: z.enum(["demo-card", "demo-upi"]),
    specialInstructions: z.string().max(240),
  })
  .superRefine((value, context) => {
    if (value.purchaseMode === "one-time" && !value.mealId) {
      context.addIssue({ code: "custom", path: ["mealId"], message: "Choose a meal" });
    }
    if (value.purchaseMode === "plan" && !value.planId) {
      context.addIssue({ code: "custom", path: ["planId"], message: "Choose a plan" });
    }
    if (value.purchaseMode === "one-time" && value.planId) {
      context.addIssue({ code: "custom", path: ["planId"], message: "A one-time order cannot include a plan" });
    }
    if (value.purchaseMode === "plan" && value.mealId) {
      context.addIssue({ code: "custom", path: ["mealId"], message: "A plan cannot include a one-time meal" });
    }
  });

export type DestinationSetupValues = z.infer<typeof destinationSetupSchema>;
export type DestinationCartValues = z.infer<typeof destinationCartSchema>;
