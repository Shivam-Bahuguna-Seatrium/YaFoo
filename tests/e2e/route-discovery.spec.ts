import { expect, test } from "@playwright/test";

test("commuter can compare pickup options along a route", async ({ page }) => {
  await page.goto("/route-results?origin=powai&destination=kandivali-west&mode=transit&time=leave-now");

  await expect(page.getByRole("heading", { name: "Smart pickup options" })).toBeVisible();
  await expect(page.getByText("6 options along your route", { exact: true })).toBeVisible();
  await expect(page.getByText("Ready before arrival", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Simulated commute data", { exact: true })).toBeVisible();
  const dimensions = await page.locator("body").evaluate((element) => ({
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);

  const mapButton = page.getByRole("button", { name: "Show route map" });
  if (await mapButton.isVisible()) {
    await mapButton.click({ force: true });
    await expect(page.getByRole("heading", { name: "Your pickup corridor" })).toBeVisible();
    await expect(page.getByRole("button", { name: /Tiffin Theory at/ })).toBeVisible();

    const listButton = page.getByRole("button", { name: "Show pickup list" });
    await listButton.click({ force: true });
    await expect(page.getByRole("heading", { name: "Smart pickup options" })).toBeVisible();
  }

  await page.getByRole("button", { name: "Vegetarian" }).dispatchEvent("click");
  await expect(page.getByText("options along your route", { exact: false })).toBeVisible();
  await page.getByRole("button", { name: "Reset", exact: true }).dispatchEvent("click");
  await expect(page.getByText("6 options along your route", { exact: true })).toBeVisible();
});
