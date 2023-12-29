import {describe, it, expect} from 'vitest';
import hamburgerMenuReducer from './reducer';
import {OPEN_HAMBURGER_MENU, CLOSE_HAMBURGER_MENU} from '../../actionTypes';

/**
 * Testing scenario
 *
 * - hamburgerMenuReducer
 *  - should handle OPEN_HAMBURGER_MENU action
 *  - should handle CLOSE_HAMBURGER_MENU action
 *  - should handle unknown action
 *  - should handle initial state for undefined state
 */

describe('hamburgerMenuReducer', () => {
  it('should handle OPEN_HAMBURGER_MENU action', () => {
    // Arrange
    const initialState = false;
    const action = {
      type: OPEN_HAMBURGER_MENU,
    };

    // Action
    const newState = hamburgerMenuReducer(initialState, action);

    // Assert
    expect(newState).toBe(true);
  });

  it('should handle CLOSE_HAMBURGER_MENU action', () => {
    // Arrange
    const currentState = true;
    const action = {
      type: CLOSE_HAMBURGER_MENU,
    };

    // Action
    const newState = hamburgerMenuReducer(currentState, action);

    // Assert
    expect(newState).toBe(false);
  });

  it('should handle unknown action', () => {
    // Arrange
    const currentState = false;
    const action = {
      type: 'UNKNOWN_ACTION_TYPE',
      payload: {data: 'someData'},
    };

    // Action
    const newState = hamburgerMenuReducer(currentState, action);

    // Assert
    expect(newState).toBe(currentState);
  });

  it('should handle initial state for undefined state', () => {
    // Arrange
    const initialState = false;
    const action = {
      type: 'UNKNOWN_ACTION_TYPE',
      payload: {data: 'someData'},
    };

    // Action
    const newState = hamburgerMenuReducer(undefined, action);

    // Assert
    expect(newState).toBe(initialState);
  });
});
