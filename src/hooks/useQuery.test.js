import {renderHook} from '@testing-library/react-hooks';
import {describe, it, expect} from 'vitest';
import useQuery from './useQuery';
import {MemoryRouter} from 'react-router-dom';

/**
 * Testing scenario
 *
 * - useQuery hooks
 *  - should initialize with default value
 */

describe('useQuery hooks', () => {
  it('should initialize with default value', () => {
    // Arrange
    const {result} = renderHook(() => useQuery(), {
      wrapper: MemoryRouter,
      initialProps: {
        initialEntries: ['/path?param1=value1&param2=value2'],
      },
    });
    const query = result.current;

    // Assert
    expect(query.get('param1')).toBe('value1');
    expect(query.get('param2')).toBe('value2');
  });
});
