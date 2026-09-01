import { expect, test } from "@playwright/test";

test("commuter can customize food and place a simulated pickup order", async ({ page }) => {
  await page.goto("/restaurant/dosa-district?route=powai-to-kandivali-west");
  await expect(page.getByRole("heading", { name: "Dosa District" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Customize" })).toBeVisible();

  await page.getByRole("button", { name: "Customize" }).dispatchEvent("click");
  await expect(page.getByRole("dialog", { name: "Classic Masala Dosa" })).toBeVisible();
  await page.getByRole("button", { name: /Ghee roast/ }).dispatchEvent("click");
  await page.getByRole("textbox", { name: /Special instructions/ }).fill("Extra chutney");
  await page.getByRole("button", { name: "Add to cart" }).dispatchEvent("click");

  await expect(page.getByRole("link", { name: "Review" })).toBeVisible();
  await page.goto("/checkout");
  await expect(page.getByRole("heading", { name: "Review your pickup" })).toBeVisible();
  await expect(page.getByText("Powai Start Hub", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("No real payment will be processed", { exact: true })).toBeVisible();
  await expect(page.getByText("Ready before arrival", { exact: true }).first()).toBeVisible();

  await page.getByRole("button", { name: "Place Pickup Order" }).dispatchEvent("click");
  await page.waitForURL(/\/orders\/order-/);
  await expect(page.getByText("Pickup locked in", { exact: true })).toBeVisible();
  await expect(page.getByText("Collection code", { exact: true }).first()).toBeVisible();
});
