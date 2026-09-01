import { expect, test } from "@playwright/test";

test("order tracking advances through the terminal collected state", async ({ page }) => {
  await page.goto("/restaurant/tiffin-theory?route=powai-to-kandivali-west");
  await page.getByRole("button", { name: "Add" }).first().dispatchEvent("click");
  await page.goto("/checkout");
  await page.getByRole("button", { name: "Place Pickup Order" }).dispatchEvent("click");
  await page.waitForURL(/\/orders\/order-/);

  await expect(page.getByRole("list", { name: "Order progress" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Mark preparing" })).toBeVisible();

  await page.getByRole("button", { name: "Mark preparing" }).dispatchEvent("click");
  await expect(page.getByRole("button", { name: "Mark ready for pickup" })).toBeVisible();
  await page.getByRole("button", { name: "Mark ready for pickup" }).dispatchEvent("click");
  await expect(page.getByRole("button", { name: "Mark collected" })).toBeVisible();
  await page.getByRole("button", { name: "Mark collected" }).dispatchEvent("click");

  const completeButton = page.getByRole("button", { name: "Pickup complete" });
  await expect(completeButton).toBeDisabled();
  await expect(page.getByText("Nice one. You are on your way.", { exact: true })).toBeVisible();
});
