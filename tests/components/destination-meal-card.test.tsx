import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DestinationMealCard } from "@/components/destination/destination-meal-card";
import { destinationMeals } from "@/lib/mock-data";

describe("DestinationMealCard", () => {
  it("shows comparison details and selects an available meal", async () => {
    const meal = destinationMeals[0];
    const onSelect = vi.fn();
    render(<DestinationMealCard meal={meal} onSelect={onSelect} />);

    expect(screen.getByRole("heading", { name: meal.name })).toBeInTheDocument();
    expect(screen.getByText(meal.servingLabel)).toBeInTheDocument();
    expect(screen.getByText(`${meal.deliveryMinutes} min delivery`)).toBeInTheDocument();
    expect(screen.getByText("Simulated kitchen")).toBeInTheDocument();

    screen.getByRole("button", { name: "Choose meal" }).click();
    expect(onSelect).toHaveBeenCalledWith(meal);
  });
});
