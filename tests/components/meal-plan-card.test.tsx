import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { MealPlanCard } from "@/components/destination/meal-plan-card";
import { mealPlans } from "@/lib/mock-data";

describe("MealPlanCard", () => {
  it("makes recurring commitment and simulated billing visible", () => {
    const plan = mealPlans[0];
    const onSelect = vi.fn();
    render(<MealPlanCard plan={plan} onSelect={onSelect} />);

    expect(screen.getByRole("heading", { name: plan.name })).toBeInTheDocument();
    expect(screen.getByText(plan.cadenceLabel)).toBeInTheDocument();
    expect(screen.getByText(`${plan.durationWeeks} week plan`)).toBeInTheDocument();
    expect(screen.getByText("No real recurring charge")).toBeInTheDocument();
    screen.getByRole("button", { name: "Choose plan" }).click();
    expect(onSelect).toHaveBeenCalledWith(plan);
  });
});
