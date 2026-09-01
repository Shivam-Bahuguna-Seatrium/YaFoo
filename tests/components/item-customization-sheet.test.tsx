import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ItemCustomizationSheet } from "@/components/menu/item-customization-sheet";
import { customizationGroups, menuItems } from "@/lib/mock-data";

const item = menuItems.find((menuItem) => menuItem.id === "masala-dosa");
if (!item) throw new Error("Expected masala dosa fixture");

describe("ItemCustomizationSheet", () => {
  it("updates price and returns selections when adding a customized item", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    const onClose = vi.fn();
    const groups = customizationGroups.filter((group) => item.customizationGroupIds.includes(group.id));

    render(<ItemCustomizationSheet item={item} groups={groups} open onClose={onClose} onAdd={onAdd} />);

    await user.click(screen.getByRole("button", { name: /Ghee roast/ }));
    await user.type(screen.getByRole("textbox", { name: /Special instructions/ }), "Extra chutney");
    await user.click(screen.getByRole("button", { name: "Add to cart" }));

    expect(onAdd).toHaveBeenCalledWith(
      expect.objectContaining({ specialInstructions: "Extra chutney" }),
      184,
    );
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    const onClose = vi.fn();
    const groups = customizationGroups.filter((group) => item.customizationGroupIds.includes(group.id));

    render(<ItemCustomizationSheet item={item} groups={groups} open onClose={onClose} onAdd={onAdd} />);
    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledOnce();
  });
});
