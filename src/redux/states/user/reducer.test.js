import userReducer from './reducer'; // Replace with the actual path
import {SET_USER, UNSET_USER} from '../../actionTypes';
import {describe, it, expect} from 'vitest';
/**
 * Testing scenario
 *
 * - userReducer
 *  - should handle SET_USER
 *  - should handle UNSET_USER
 *  - should handle unknown action type
 */

describe('userReducer', () => {
  it('should handle SET_USER', () => {
    const initialState = {};
    const action = {
      type: SET_USER,
      payload: {id: 1, username: 'john_doe'},
    };

    const nextState = userReducer(initialState, action);

    expect(nextState).toEqual({id: 1, username: 'john_doe'});
  });

  it('should handle UNSET_USER', () => {
    const initialState = {id: 1, username: 'john_doe'};
    const action = {
      type: UNSET_USER,
    };

    const nextState = userReducer(initialState, action);

    expect(nextState).toEqual({});
  });

  it('should handle unknown action type', () => {
    const initialState = {id: 1, username: 'john_doe'};
    const action = {
      type: 'UNKNOWN_ACTION',
      payload: {data: 'unexpected data'},
    };

    const nextState = userReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });
});
