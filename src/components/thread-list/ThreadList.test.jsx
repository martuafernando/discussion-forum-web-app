import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import ThreadList from "./ThreadList";
import { createStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

describe("ThreadList component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should show the ThreadList", () => {
    // Arrange
    const mockStore = createStore(
      (
        state = {
          user: {
            id: "users-1",
            name: "John Doe",
            avatar: "https://generated-image-url.jpg",
          },
        },
        action
      ) => {
        return state;
      }
    );
    const threads = [
      {
          "id": "thread-1",
          "title": "Thread Pertama",
          "body": "Ini adalah thread pertama",
          "category": "General",
          "createdAt": "2021-06-21T07:00:00.000Z",
          "ownerId": "users-1",
          "upVotesBy": [],
          "downVotesBy": [],
          "totalComments": 0,
          owner: {
            id: "users-1",
            name: "John Doe",
            avatar: "https://generated-image-url.jpg",
          },
      },
      {
          "id": "thread-2",
          "title": "Thread Kedua",
          "body": "Ini adalah thread kedua",
          "category": "General",
          "createdAt": "2021-06-21T07:00:00.000Z",
          "ownerId": "users-2",
          "upVotesBy": [],
          "downVotesBy": [],
          "totalComments": 0,
          owner: {
            id: "users-2",
            name: "John Doe",
            avatar: "https://generated-image-url.jpg",
          },
      }
    ]
    const { container } = render(
      <Provider store={mockStore}>
        <ThreadList
          threads={threads}
        />
      </Provider>,
      { wrapper: MemoryRouter }
    );

    // Action
    const component = container.getElementsByClassName("thread-list");

    // Assert
    expect(component).toBeTruthy();
  });
});
