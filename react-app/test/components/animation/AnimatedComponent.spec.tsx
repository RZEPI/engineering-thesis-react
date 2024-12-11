import { render, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import AnimatedComponent from "../../../src/components/animation/AnimatedComponent";

describe("AnimatedComponent", () => {
  it("Should render with the correct name", () => {
    const { container } = render(
      <AnimatedComponent name="AnimatedComponent" isRight={false} />,
    );
    expect(container.textContent).toContain("AnimatedComponent");
  });

  it("Should render component on the right when isRight is true", () => {
    const { container } = render(
      <AnimatedComponent name="Test Component" isRight={true} />,
    );

    waitFor(() => {
      const component = container.querySelector("div");
      expect(component).toBeInTheDocument();

      expect(component.style.transform).toBe("translateX(85vw)");
    });
  });

  it("Should render component on the left when isRight is false", () => {
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
