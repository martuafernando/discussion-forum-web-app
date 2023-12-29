import {describe, it, expect} from 'vitest';
import leaderboardReducer from './reducer';
import {SET_LEADERBOARD} from '../../actionTypes';

/**
 * Testing scenario
 *
 * - leaderboardReducer
 *  - should handle SET_LEADERBOARD action
 *  - should handle unknown action
 *  - should handle initial state for undefined state
 */

describe('leaderboardReducer', () => {
  it('should handle SET_LEADERBOARD action', () => {
    // Arrange
    const initialState = [];
    const action = {
      type: SET_LEADERBOARD,
      payload: [
        {user: {id: 'user-1', name: 'John Doe'}, score: 10},
        {user: {id: 'user-2', name: 'Jane Doe'}, score: 5},
      ],
    };

    // Action
    const newState = leaderboardReducer(initialState, action);

    // Assert
    expect(newState).toEqual(action.payload);
  });

  it('should handle unknown action', () => {
    // Arrange
    const currentState = [
      {user: {id: 'user-3', name: 'Alice'}, score: 8},
      {user: {id: 'user-4', name: 'Bob'}, score: 3},
    ];

    const action = {
      type: 'UNKNOWN_ACTION_TYPE',
      payload: [],
    };

    // Action
    const newState = leaderboardReducer(currentState, action);

    // Assert
    expect(newState).toEqual(currentState);
  });

  it('should handle initial state for undefined state', () => {
    // Arrange
    const action = {
      type: 'UNKNOWN_ACTION_TYPE',
      payload: [],
    };

    // Action
    const newState = leaderboardReducer(undefined, action);

    // Assert
    expect(newState).toEqual([]);
  });
});
