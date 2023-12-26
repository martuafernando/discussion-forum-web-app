import React from "react";
import {
  describe,
  it,
  expect,
  afterEach
} from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import CategoryItem from "./CategoryItem";

// expect.extend(matchers);

describe("CategoryItem component", () => {
  afterEach(() => {
    cleanup();
  });

  it('should show the category display', async () => {
    // Arrange
    render(
      <CategoryItem
        display="testing"
      />,
      { wrapper: MemoryRouter }
    )

    const component = await screen.getByText('#testing');
    expect(component).exist;
  });
});
