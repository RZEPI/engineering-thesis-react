import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ToggleInput from "../../../src/components/flexbox/form/ToggleInput";

describe("ToggleInput", () => {
  it("Should call the toggleFunc prop when ToggleSwitch is clicked", async () => {
    const mockFunc = vi.fn();

    const { container } = render(
      <ToggleInput
        inputHeader="Direction"
        choices={["Row", "Column"]}
        toggleFunc={mockFunc}
      />,
    );

    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeInTheDocument();

    await userEvent.click(checkbox);

    expect(mockFunc).toHaveBeenCalledTimes(1);
  });
});
