import { expect, test } from "@playwright/test";

test.describe("destination ordering", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.localStorage.clear());
  });

  test("switches from route pickup to one-time destination meals", async ({ page }) => {
    await page.getByRole("tab", { name: /At Destination/ }).click();
    await expect(page.getByRole("heading", { name: /Where should we meet you/ })).toBeVisible();
    await page.getByRole("button", { name: "See meals for this place" }).click();
    await expect(page).toHaveURL(/destination-results/);
    await expect(page.getByRole("heading", { name: "Choose something good" })).toBeVisible();
    await page.getByRole("button", { name: "Choose meal" }).first().click();
    await expect(page.getByRole("heading", { name: "Review your destination meal" })).toBeVisible();
    await expect(page.getByText("No live delivery, payment, or recurring charge will be created.")).toBeVisible();
  });

  test("shows a recurring plan with explicit cadence and billing language", async ({ page }) => {
    await page.getByRole("tab", { name: /At Destination/ }).click();
    await page.getByRole("button", { name: "Dabba / Tiffin plan" }).click();
    await page.getByRole("button", { name: "See tiffin plans" }).click();
    await expect(page.getByRole("heading", { name: "Pick your weekday rhythm" })).toBeVisible();
    await page.getByRole("button", { name: "Choose plan" }).first().click();
    await expect(page.getByRole("heading", { name: "Review your tiffin plan" })).toBeVisible();
    await expect(page.getByRole("complementary").getByText("Every weekday")).toBeVisible();
    await expect(page.getByText("No real recurring charge")).toBeVisible();
  });
});
