import {vi, describe, it, expect, afterEach} from 'vitest';
import {cleanup, render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import VoteItemReaction from './VoteItemReaction';
import {createStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';

/**
 * Testing scenario
 *
 * - VoteItemReaction component
 *  - should show the VoteItemReaction
 *  - should trigger neutral vote if the thread already liked
 *  - should trigger neutral vote if the thread already disliked
 */

describe('VoteItemReaction component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should show the VoteItemReaction', () => {
    // Arrange
    const mockStore = createStore(
        (
            state = {
              user: {
                id: 'users-1',
                name: 'John Doe',
                avatar: 'https://generated-image-url.jpg',
              },
            },
            action,
        ) => {
          return state;
        },
    );

    const {container} = render(
        <Provider store={mockStore}>
          <VoteItemReaction
            upVotes={['users-1', 'users-2']}
            downVotes={['users-3', 'users-4']}
            totalComments={2}
            onUpVote={() => {}}
            onDownVote={() => {}}
            onComment={() => {}}
            onCancelVote={() => {}}
          />
        </Provider>,
        {wrapper: MemoryRouter},
    );

    // Action
    const component = container.getElementsByClassName('vote-item-reaction');

    // Assert
    expect(component).toBeTruthy();
  });

  it('should trigger neutral vote if the thread already liked', async () => {
    // Arrange
    const mockStore = createStore(
        (
            state = {
              user: {
                id: 'users-1',
                name: 'John Doe',
                avatar: 'https://generated-image-url.jpg',
              },
            },
            action,
        ) => {
          return state;
        },
    );
    const mockUpVoteFunction = vi.fn();
    const mockNeutralVoteFunction = vi.fn();

    const {container} = render(
        <Provider store={mockStore}>
          <VoteItemReaction
            upVotes={['users-1', 'users-2']}
            downVotes={['users-3', 'users-4']}
            totalComments={2}
            onUpVote={mockUpVoteFunction}
            onDownVote={() => {}}
            onComment={() => {}}
            onCancelVote={mockNeutralVoteFunction}
          />
        </Provider>,
        {wrapper: MemoryRouter},
    );

    // Action
    const component = container.getElementsByClassName('vote-item-reaction');
    const upVoteButton = container.querySelector(
        '.vote-item-reaction__vote button svg',
    );
    await userEvent.click(upVoteButton);

    // Assert
    expect(component).toBeTruthy();
    expect(upVoteButton).toBeTruthy();
    expect(mockUpVoteFunction).not.toBeCalled();
    expect(mockNeutralVoteFunction).toBeCalled();
  });

  it('should trigger neutral vote if the thread already disliked', async () => {
    // Arrange
    const mockStore = createStore(
        (
            state = {
              user: {
                id: 'users-3',
                name: 'John Doe',
                avatar: 'https://generated-image-url.jpg',
              },
            },
            action,
        ) => {
          return state;
        },
    );
    const mockUpVoteFunction = vi.fn();
    const mockNeutralVoteFunction = vi.fn();

    const {container} = render(
        <Provider store={mockStore}>
          <VoteItemReaction
            upVotes={['users-1', 'users-2']}
            downVotes={['users-3', 'users-4']}
            totalComments={2}
            onUpVote={mockUpVoteFunction}
            onDownVote={() => {}}
            onComment={() => {}}
            onCancelVote={mockNeutralVoteFunction}
          />
        </Provider>,
        {wrapper: MemoryRouter},
    );

    // Action
    const component = container.getElementsByClassName('vote-item-reaction');
    const upVoteButton = container.querySelector(
        '.vote-item-reaction__vote:nth-child(2) button svg',
    );
    await userEvent.click(upVoteButton);

    // Assert
    expect(component).toBeTruthy();
    expect(upVoteButton).toBeTruthy();
    expect(mockUpVoteFunction).not.toBeCalled();
    expect(mockNeutralVoteFunction).toBeCalled();
  });
});
