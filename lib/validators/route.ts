import { z } from "zod";

export const routeSearchSchema = z
  .object({
    originId: z.string().min(1, "Choose a starting point"),
    destinationId: z.string().min(1, "Choose a destination"),
    commuteMode: z.enum(["transit", "car", "walk"]),
    pickupTimeMode: z.enum(["leave-now", "scheduled"]),
    scheduledAt: z.string().optional(),
  })
  .superRefine((value, context) => {
    if (value.originId === value.destinationId) {
      context.addIssue({
        code: "custom",
        path: ["destinationId"],
        message: "Choose a different destination",
      });
    }

    if (value.pickupTimeMode === "scheduled" && !value.scheduledAt) {
      context.addIssue({
        code: "custom",
        path: ["scheduledAt"],
        message: "Choose a pickup time",
      });
    }
  });

export type RouteSearchValues = z.infer<typeof routeSearchSchema>;
