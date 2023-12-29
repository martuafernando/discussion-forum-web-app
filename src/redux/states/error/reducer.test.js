import {describe, it, expect} from 'vitest';
import errorReducer from './reducer';
import {SET_ERROR, UNSET_ERROR} from '../../actionTypes';

/**
 * Testing scenario
 *
 * - errorReducer
 *  - should handle initial state for undefined state
 *  - should handle SET_ERROR action correctly
 *  - should handle UNSET_ERROR action correctly
 *  - should handle unknown action
 */

describe('errorReducer', () => {
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
    const newState = errorReducer(undefined, action);

    // Assert
    expect(newState).toEqual(initialState);
  });

  it('should handle SET_ERROR action correctly', () => {
    // Arrange
    const initialState = {
      isExists: false,
      type: '',
      message: '',
    };

    const action = {
      type: SET_ERROR,
      payload: {
        isExists: true,
        type: 'someType',
        message: 'someMessage',
      },
    };

    // Action
    const newState = errorReducer(initialState, action);

    // Assert
    expect(newState).toEqual(action.payload);
  });

  it('should handle UNSET_ERROR action correctly', () => {
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
      type: UNSET_ERROR,
    };

    // Action
    const newState = errorReducer(currentState, action);

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
    const newState = errorReducer(currentState, action);

    // Assert
    expect(newState).toEqual(currentState);
  });
});
