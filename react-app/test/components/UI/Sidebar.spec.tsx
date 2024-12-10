import { render, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Sidebar from "../../../src/components/UI/sidebar/Sidebar"; // Ścieżka do komponentu

// Opis testów
describe("Sidebar", () => {
  it("Should render collapsed", () => {
    const { container } = render(<Sidebar />);

    const navElement = container.querySelector("nav");
    expect(navElement).not.toBeInTheDocument();
  });

  it("Should render Navbar after pressing the button", () => {
    const { container } = render(<Sidebar />);

    const burgerButton = container.querySelector('[role="burgerbutton"]');
    expect(burgerButton).toBeInTheDocument();

    userEvent.click(burgerButton);

    waitFor(() => {
      const navElement = container.querySelector("nav");
      expect(navElement).toBeInTheDocument();
    });
  });
});
