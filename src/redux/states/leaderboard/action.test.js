import {vi, describe, it, expect, beforeEach, afterEach} from 'vitest';
import agent from '../../../utils/agent';
import {asyncGetLeaderboard} from './action';
import {showLoading} from 'react-redux-loading-bar';
import {SET_LEADERBOARD} from '../../actionTypes';
import {hideLoading} from 'react-redux-loading-bar';
import {setError} from '../error/action';

/**
 * Testing scenario
 *
 * - asyncGetLeaderboard
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 */

vi.mock('../error/action', () => ({
  setError: vi.fn(),
}));

describe('asyncGetLeaderboard', () => {
  beforeEach(() => {
    agent.Leaderboard._getLeaderboard = agent.Leaderboard.getLeaderboard;
  });

  afterEach(() => {
    agent.Leaderboard.getLeaderboard = agent.Leaderboard._getLeaderboard;

    // delete backup data
    delete agent.Leaderboard._getLeaderboard;

    // Reset Mock
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    const dispatch = vi.fn();
    const fakeLeaderboardResponse = {
      status: 'success',
      message: 'ok',
      data: {
        leaderboards: [
          {
            user: {
              id: 'users-1',
              name: 'John Doe',
              email: 'john@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
            score: 10,
          },
          {
            user: {
              id: 'users-2',
              name: 'Jane Doe',
              email: 'jane@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
            score: 5,
          },
        ],
      },
    };
    agent.Leaderboard.getLeaderboard = () =>
      Promise.resolve(fakeLeaderboardResponse);

    // Action
    await asyncGetLeaderboard()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: SET_LEADERBOARD,
      payload: [
        {
          user: {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
          score: 10,
        },
        {
          user: {
            id: 'users-2',
            name: 'Jane Doe',
            email: 'jane@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
          score: 5,
        },
      ],
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // Arrange
    const dispatch = vi.fn();
    const fakeLeaderboardResponse = {
      status: 'failed',
      message: 'failed message',
    };
    agent.Leaderboard.getLeaderboard = () =>
      Promise.reject(fakeLeaderboardResponse);

    // Action
    await asyncGetLeaderboard()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(setError).toHaveBeenCalledWith({
      type: 'error',
      message: 'failed message',
    });
  });
});
