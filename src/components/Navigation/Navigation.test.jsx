import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Navigation from "./Navigation";
import { MemoryRouter } from "react-router-dom";

describe("Navigation component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should show the navigation", () => {
    // Arrange
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Navigation />
      </MemoryRouter>
    );
    const component = container.querySelector("nav");

    // Assert
    expect(component).toBeTruthy();
  });

  it("should show the leaderboards active navigation", async () => {
    // Arrange

    const { container } = render(
      <MemoryRouter initialEntries={['/leaderboards']}>
        <Navigation />
      </MemoryRouter>
    );

    // Assert
    expect(
      container.querySelector('nav li a[href="/leaderboards"]').closest("li")
    ).toHaveClass("active");
    expect(
      container.querySelector('nav li a[href="/"]').closest("li")
    ).not.toHaveClass("active");
    expect(
      container.querySelector('nav li a[href="/profile"]').closest("li")
    ).not.toHaveClass("active");
  });

  it("should show the profile active navigation", async () => {
    // Arrange

    const { container } = render(
      <MemoryRouter initialEntries={['/profile']}>
        <Navigation />
      </MemoryRouter>
    );

    // Assert
    expect(
      container.querySelector('nav li a[href="/profile"]').closest("li")
    ).toHaveClass("active");
    expect(
      container.querySelector('nav li a[href="/"]').closest("li")
    ).not.toHaveClass("active");
    expect(
      container.querySelector('nav li a[href="/leaderboards"]').closest("li")
    ).not.toHaveClass("active");
  });
});
