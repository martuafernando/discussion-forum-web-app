import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import CommentItem from "./CommentItem";
import { createStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

describe("CommentItem component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should show the CommentItem", () => {
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
    const comment = {
      id: "comment-1",
      content: "Ini adalah komentar pertama",
      createdAt: "2021-06-21T07:00:00.000Z",
      owner: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
      },
      upVotesBy: [],
      downVotesBy: [],
    };
    const { container } = render(
      <Provider store={mockStore}>
        <CommentItem
          comment={comment}
          onUpVote={() => {}}
          onDownVote={() => {}}
          onCancelVote={() => {}}
        />
      </Provider>
    );

    // Action
    const component = container.getElementsByClassName("comment-item");

    // Assert
    expect(component).toBeTruthy();
  });
});
