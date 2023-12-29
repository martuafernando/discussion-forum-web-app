import {renderHook, act} from '@testing-library/react-hooks';
import useInput from './useInput';
import {describe, it, expect} from 'vitest';

/**
 * Testing scenario
 *
 * - useInput hooks
 *  - should initialize with default value
 *  - should update value on input change
 *  - should update value on contenteditable change
 */

describe('useInput hooks', () => {
  it('should initialize with default value', () => {
    // Arrange
    const {result} = renderHook(() => useInput('initialValue'));
    const [value] = result.current;

    // Assert
    expect(value).toBe('initialValue');
  });

  it('should update value on input change', () => {
    // Arrange
    const {result} = renderHook(() => useInput(''));
    const [, onValueChange] = result.current;

    // Action
    act(() => {
      onValueChange({target: {value: 'new value'}});
    });

    // Assert
    const [value] = result.current;
    expect(value).toBe('new value');
  });

  it('should update value on contenteditable change', () => {
    // Arrange
    const {result} = renderHook(() => useInput(''));
    const [, onValueChange] = result.current;

    // Action
    act(() => {
      onValueChange({target: {nodeName: 'DIV', innerHTML: 'new value'}});
    });

    // Assert
    const [value] = result.current;
    expect(value).toBe('new value');
  });
});
