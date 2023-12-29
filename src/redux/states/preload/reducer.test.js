import {describe, it, expect} from 'vitest';
import preloadReducer from './reducer';
import {SET_PRELOAD, UNSET_PRELOAD} from '../../actionTypes';

/**
 * Testing scenario
 *
 * - preloadReducer
 *  - should handle SET_PRELOAD action
 *  - should handle UNSET_PRELOAD action
 *  - should handle unknown action
 *  - should handle initial state for undefined state
 */

describe('preloadReducer', () => {
  it('should handle SET_PRELOAD action', () => {
    // Arrange
    const initialState = false;
    const action = {
      type: SET_PRELOAD,
    };

    // Action
    const newState = preloadReducer(initialState, action);

    // Assert
    expect(newState).toBe(true);
  });

  it('should handle UNSET_PRELOAD action', () => {
    // Arrange
    const currentState = true;
    const action = {
      type: UNSET_PRELOAD,
    };

    // Action
    const newState = preloadReducer(currentState, action);

    // Assert
    expect(newState).toBe(false);
  });

  it('should handle unknown action', () => {
    // Arrange
    const currentState = false;
    const action = {
      type: 'UNKNOWN_ACTION_TYPE',
      payload: false,
    };

    // Action
    const newState = preloadReducer(currentState, action);

    // Assert
    expect(newState).toBe(currentState);
  });

  it('should handle initial state for undefined state', () => {
    // Arrange
    const action = {
      type: 'UNKNOWN_ACTION_TYPE',
      payload: false,
    };

    // Action
    const newState = preloadReducer(undefined, action);

    // Assert
    expect(newState).toBe(false);
  });
});
