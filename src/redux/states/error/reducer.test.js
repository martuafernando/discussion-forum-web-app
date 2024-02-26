import {describe, it, expect} from 'vitest';
import messageReducer from './reducer';
import {SET_MESSAGE, UNSET_MESSAGE} from '../../actionTypes';

/**
 * Testing scenario
 *
 * - messageReducer
 *  - should handle initial state for undefined state
 *  - should handle SET_MESSAGE action correctly
 *  - should handle UNSET_MESSAGE action correctly
 *  - should handle unknown action
 */

describe('messageReducer', () => {
  it('should handle initial state for undefined state', () => {
    // Arrange
    const initialState = {
      isExists: false,
      type: '',
      message: '',
    };
    const action = {
      type: 'UNKNOWN_ACTION_TYPE',
      payload: {data: 'someData'},
    };

    // Action
    const newState = messageReducer(undefined, action);

    // Assert
    expect(newState).toEqual(initialState);
  });

  it('should handle SET_MESSAGE action correctly', () => {
    // Arrange
    const initialState = {
      isExists: false,
      type: '',
      message: '',
    };

    const action = {
      type: SET_MESSAGE,
      payload: {
        isExists: true,
        type: 'someType',
        message: 'someMessage',
      },
    };

    // Action
    const newState = messageReducer(initialState, action);

    // Assert
    expect(newState).toEqual(action.payload);
  });

  it('should handle UNSET_MESSAGE action correctly', () => {
    // Arrange
    const initialState = {
      isExists: false,
      type: '',
      message: '',
    };
    const currentState = {
      isExists: true,
      type: 'someType',
      message: 'someMessage',
    };

    const action = {
      type: UNSET_MESSAGE,
    };

    // Action
    const newState = messageReducer(currentState, action);

    // Assert
    expect(newState).toEqual(initialState);
  });

  it('should handle unknown action', () => {
    // Arrange
    const currentState = {
      isExists: true,
      type: 'someType',
      message: 'someMessage',
    };

    const action = {
      type: 'UNKNOWN_ACTION_TYPE',
      payload: {data: 'someData'},
    };

    // Action
    const newState = messageReducer(currentState, action);

    // Assert
    expect(newState).toEqual(currentState);
  });
});
