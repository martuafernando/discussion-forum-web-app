import {setError} from './action';
import {vi, describe, it, expect} from 'vitest';
import {SET_ERROR} from '../../actionTypes';

/**
 * Testing scenario
 *
 * - setError function
 *  - should dispatch action correctly
 */

describe('setError function', () => {
  it('should dispatch action correctly', () => {
    // Arrange
    const error = {
      type: 'ERROR',
      message: 'testing message',
    };
    const dispatch = vi.fn();

    // Action
    setError(error)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith({
      type: SET_ERROR,
      payload: {
        isExists: true,
        type: 'ERROR',
        message: 'testing message',
      },
    });
  });
});
