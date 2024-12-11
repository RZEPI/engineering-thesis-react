import { describe, it, expect } from "vitest";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AnimatedComponent from "../../../src/components/animation/AnimatedComponent";

describe("AnimatedComponent", () => {
  it("Renders with the correct name", () => {
    const { container } = render(
      <AnimatedComponent name="AnimatedComponent" isRight={false} />,
    );
    expect(container.textContent).toContain("AnimatedComponent");
  });
  it("Renders component on the right when isRight is true", () => {
    const { container } = render(
      <AnimatedComponent name="Test Component" isRight={true} />,
    );

    waitFor(() => {
      const component = container.querySelector("div");
      expect(component).toBeInTheDocument();

      expect(component.style.transform).toBe("translateX(85vw)");
    });
  });
  it("Renders component on the left when isRight is false", () => {
    const { container } = render(
      <AnimatedComponent name="Test Component" isRight={false} />,
    );

    waitFor(() => {
      const component = container.querySelector("div");
      expect(component).toBeInTheDocument();

      expect(component.style.transform).toBe("translateX(0)");
    });
  });
});
