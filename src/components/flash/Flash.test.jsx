import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { createStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Flash from "./Flash";
import { UNSET_ERROR } from "../../redux/actionTypes";

describe("Flash component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should hidden the Flash if there is no error", () => {
    // Arrange
    const error = {
      isExists: false,
      type: "",
      message: "",
    };
    const mockStore = createStore((state = { error }, action) => {
      return state;
    });

    const { container } = render(
      <Provider store={mockStore}>
        <Flash />
      </Provider>
    );

    // Action
    const component = container.querySelector(".flash.hidden");

    // Assert
    expect(component).toBeTruthy();
  });

  it("should show the Flash if there is error", () => {
    // Arrange
    const error = {
      isExists: true,
      type: "testing-type",
      message: "testing-message",
    };
    const mockStore = createStore((state = { error }, action) => {
      return state;
    });

    const { container } = render(
      <Provider store={mockStore}>
        <Flash />
      </Provider>
    );

    // Action
    const component = container.querySelector(".flash.hidden");

    // Assert
    expect(component).toBeFalsy();
  });

  it("should remove the Flash if the close button clicked", async () => {
    // Arrange
    const error = {
      isExists: true,
      type: "testing-type",
      message: "testing-message",
    };
    const mockStore = createStore((state = { error }, action) => {
      if (action.type === UNSET_ERROR) {
        return {
          error: {
            isExists: false,
            type: "",
            message: "",
          }
        }
      }

      return state;
    });

    const { container } = render(
      <Provider store={mockStore}>
        <Flash />
      </Provider>
    );

    // Action
    const closeButton = container.querySelector(".flash__close-button");
    await userEvent.click(closeButton)

    // Assert
    expect(container.querySelector(".flash.hidden")).toBeTruthy();
  });
});
