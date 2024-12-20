import { render, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import Sidebar from "../../../src/components/UI/sidebar/Sidebar"; // Ścieżka do komponentu

describe("Sidebar", () => {
  it("Should render collapsed", () => {
    const { container } = render(<Sidebar />);
    const navElement = container.querySelector("nav");

    expect(container.contains(navElement)).toBe(false);
  });

  it("Should render Navbar after pressing the button", () => {
    const { container } = render(<Sidebar />);

    const burgerButton = container.querySelector('[role="burgerbutton"]');
    expect(container.contains(burgerButton)).toBe(true);

    userEvent.click(burgerButton);

    waitFor(() => {
      const navElement = container.querySelector("nav");
      expect(container.contains(navElement)).toBe(true);
    });
  });
});
