import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { createStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Header from "./Header";
import { CLOSE_HAMBURGER_MENU, OPEN_HAMBURGER_MENU } from "../../redux/actionTypes";

describe("Header component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should show the header", () => {
    // Arrange
    const mockStore = createStore((state = {
      user: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
      },
    }, action) => {
      return state;
    });

    const { container } = render(
      <Provider store={mockStore}>
        <Header></Header>
      </Provider>,
      {wrapper: MemoryRouter}
    );

    // Action
    const component = container.querySelector("header");

    // Assert
    expect(component).toBeTruthy();
  });

  it("should show sign-in button when there's no user authenticated", () => {
    // Arrange
    const mockStore = createStore((state = {
      user: {},
    }, action) => {
      return state;
    });

    const { container } = render(
      <Provider store={mockStore}>
        <Header></Header>
      </Provider>,
      {wrapper: MemoryRouter}
    );

    // Assert
    expect(
      container.querySelector('[href="/auth/login"]')
    ).toBeTruthy();
    expect(
      container.querySelector('[href="/auth/register"]')
    ).toBeTruthy();
  });

  it("should show avatar there's user authenticated", () => {
    // Arrange
    const mockStore = createStore((state = {
      user: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
      },
    }, action) => {
      return state;
    });

    const { container } = render(
      <Provider store={mockStore}>
        <Header></Header>
      </Provider>,
      {wrapper: MemoryRouter}
    );

    // Assert
    expect(
      container.querySelector('[href="/auth/login"]')
    ).toBeFalsy();
    expect(
      container.querySelector('[href="/auth/register"]')
    ).toBeFalsy();
    expect(
      container.querySelector('.header__avatar')
    ).toBeTruthy();
  });

  it("should query the page with the keyword when search form submited", async () => {
    // Arrange
    const mockStore = createStore((state = {
      user: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
      },
    }, action) => {
      return state;
    });

    const { container } = render(
      <Provider store={mockStore}>
        <Header></Header>
      </Provider>,
      { wrapper: BrowserRouter }
    );

    // Action
    await userEvent.type(
      container.querySelector('input.header__search_input'), 'testing-search'
    )
    await userEvent.type(
      container.querySelector('input.header__search_input'), '{enter}'
    )

    // Assert
    expect(window.location.search).toBe("?keyword=testing-search")
  });

  it("should show the drawer-menu when state hamburgerMenu true", () => {
    // Arrange
    const mockStore = createStore((state = {
      user: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
      },
      hamburgerMenu: true
    }, action) => {
      switch (action.type) {
        case CLOSE_HAMBURGER_MENU: return {
          ...state,
          hamburgerMenu: false
        }
        case OPEN_HAMBURGER_MENU: return {
          ...state,
          hamburgerMenu: true
        }
        default: return state
      }
    });

    const { container } = render(
      <Provider store={mockStore}>
        <Header></Header>
      </Provider>,
      {wrapper: MemoryRouter}
    );

    // Action
    const component = container.querySelector(".header__drawer-menu.active");

    // Assert
    expect(component).toBeTruthy();
  });

  it("should hidden the drawer-menu when state hamburgerMenu false", () => {
    // Arrange
    const mockStore = createStore((state = {
      user: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
      },
      hamburgerMenu: false
    }, action) => {
      switch (action.type) {
        case CLOSE_HAMBURGER_MENU: return {
          ...state,
          hamburgerMenu: false
        }
        case OPEN_HAMBURGER_MENU: return {
          ...state,
          hamburgerMenu: true
        }
        default: return state
      }
    });

    const { container } = render(
      <Provider store={mockStore}>
        <Header></Header>
      </Provider>,
      {wrapper: MemoryRouter}
    );

    // Action
    const component = container.querySelector(".header__drawer-menu.active");

    // Assert
    expect(component).toBeFalsy();
  });

  it("should toggle state hamburgerMenu to be true when hamburger menu clicked", async () => {
    // Arrange
    const mockStore = createStore((state = {
      user: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
      },
      hamburgerMenu: false
    }, action) => {
      switch (action.type) {
        case CLOSE_HAMBURGER_MENU: return {
          ...state,
          hamburgerMenu: false
        }
        case OPEN_HAMBURGER_MENU: return {
          ...state,
          hamburgerMenu: true
        }
        default: return state
      }
    });

    const { container } = render(
      <Provider store={mockStore}>
        <Header></Header>
      </Provider>,
      {wrapper: MemoryRouter}
    );
    expect(
      container.querySelector(".header__drawer-menu.active")
    ).toBeFalsy();

    // Action
    const hamburgerMenu = container.querySelector(".header__hamburger-menu")
    await userEvent.click(hamburgerMenu)

    // Assert
    expect(
      container.querySelector(".header__drawer-menu.active")
    ).toBeTruthy();
  });

  it("should toggle state hamburgerMenu to be false when hamburger menu clicked", async () => {
    // Arrange
    const mockStore = createStore((state = {
      user: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
      },
      hamburgerMenu: true
    }, action) => {
      switch (action.type) {
        case CLOSE_HAMBURGER_MENU: return {
          ...state,
          hamburgerMenu: false
        }
        case OPEN_HAMBURGER_MENU: return {
          ...state,
          hamburgerMenu: true
        }
        default: return state
      }
    });

    const { container } = render(
      <Provider store={mockStore}>
        <Header></Header>
      </Provider>,
      {wrapper: MemoryRouter}
    );
    expect(
      container.querySelector(".header__drawer-menu.active")
    ).toBeTruthy();

    // Action
    const hamburgerMenu = container.querySelector(".header__hamburger-menu")
    await userEvent.click(hamburgerMenu)

    // Assert
    expect(
      container.querySelector(".header__drawer-menu.active")
    ).toBeFalsy();
  });
  
});
