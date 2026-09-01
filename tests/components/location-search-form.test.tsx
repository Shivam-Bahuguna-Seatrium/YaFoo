import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { LocationSearchForm } from "@/components/route/location-search-form";
import { useYafooStore } from "@/stores/yafoo-store";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

describe("LocationSearchForm", () => {
  beforeEach(() => {
    push.mockReset();
    useYafooStore.setState({ recentRoutes: [], hasHydrated: true });
  });

  it("starts with the default route and swaps its locations", async () => {
    const user = userEvent.setup();
    render(<LocationSearchForm />);

    const origin = screen.getByLabelText("Starting point");
    const destination = screen.getByLabelText("Destination");

    expect(origin).toHaveValue("powai");
    expect(destination).toHaveValue("kandivali-west");

    await user.click(screen.getByRole("button", { name: "Swap starting point and destination" }));

    expect(origin).toHaveValue("kandivali-west");
    expect(destination).toHaveValue("powai");
  });

  it("navigates with the selected route context", async () => {
    const user = userEvent.setup();
    render(<LocationSearchForm />);

    await user.click(screen.getByRole("button", { name: "Find Food on My Route" }));

    expect(push).toHaveBeenCalledWith(
      "/route-results?origin=powai&destination=kandivali-west&mode=transit&time=leave-now",
    );
  });
});
