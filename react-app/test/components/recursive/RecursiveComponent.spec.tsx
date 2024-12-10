import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RecursiveComponent from "../../../src/components/recursive/RecursiveComponent";

describe("RecursiveComponent", () => {
  it("Renders 4 instances of Recursive Component", () => {
    const { container } = render(
      <RecursiveComponent message="Depth:" depth={1} maxDepth={4} />,
    );

    const instances = container.querySelectorAll('[role="recursivecomponent"]');

    expect(instances.length).toBe(4);
  });
});
