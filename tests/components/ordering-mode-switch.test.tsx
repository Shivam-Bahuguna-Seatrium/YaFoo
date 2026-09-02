import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { OrderingModeSwitch } from "@/components/home/ordering-mode-switch";

describe("OrderingModeSwitch", () => {
  it("shows the selected mode and switches with a keyboard-accessible button", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<OrderingModeSwitch value="on-the-way" onChange={onChange} />);

    expect(screen.getByRole("tab", { name: /On the Way/ })).toHaveAttribute("aria-selected", "true");
    await user.click(screen.getByRole("tab", { name: /At Destination/ }));

    expect(onChange).toHaveBeenCalledWith("at-destination");
  });
});
