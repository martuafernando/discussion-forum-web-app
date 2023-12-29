import {describe, it, expect, afterEach} from 'vitest';
import {cleanup, render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import ThreadItem from './ThreadItem';
import {createStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';

/**
 * Testing scenario
 *
 * - ThreadItem component
 *  - should show the ThreadItem
 */

describe('ThreadItem component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should show the ThreadItem', () => {
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
    const thread = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
    };
    const {container} = render(
        <Provider store={mockStore}>
          <ThreadItem
            thread={thread}
            onUpVote={() => {}}
            onDownVote={() => {}}
            onCancelVote={() => {}}
          />
        </Provider>,
        {wrapper: MemoryRouter},
    );

    // Action
    const component = container.getElementsByClassName('thread-item');

    // Assert
    expect(component).toBeTruthy();
  });
});
