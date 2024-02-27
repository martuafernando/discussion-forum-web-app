import {setMessage} from './action';
import {vi, describe, it, expect} from 'vitest';
import {SET_MESSAGE} from '../../actionTypes';

/**
 * Testing scenario
 *
 * - setMessage function
 *  - should dispatch action correctly
 */

describe('setMessage function', () => {
  it('should dispatch action correctly', () => {
    // Arrange
    const error = {
      type: 'ERROR',
      message: 'testing message',
    };
    const dispatch = vi.fn();

    // Action
    setMessage(error)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith({
      type: SET_MESSAGE,
      payload: {
        isExists: true,
        type: 'ERROR',
        message: 'testing message',
      },
    });
  });
});
