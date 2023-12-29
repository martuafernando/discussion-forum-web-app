import {
  vi,
  describe,
  it,
  expect,
  afterEach,
} from 'vitest';
import {
  cleanup,
  render,
} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import ThreadCreateNew from './ThreadCreateNew';

/**
 * Testing scenario
 *
 * - ThreadCreateNew component
 *  - should show the ThreadCreateNew display
 *  - should execute onClick function when component clicked
 */

describe('ThreadCreateNew component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should show the ThreadCreateNew display', () => {
    // Arrange
    const {container} = render(
        <ThreadCreateNew
          avatarUrl='testing-url'
          onClick={() => {}}
        />,
        {wrapper: MemoryRouter},
    );
    const component = container.querySelector('.thread-create-new');

    // Assert
    expect(component).toBeTruthy();
  });

  it('should execute onClick function when component clicked', async () => {
    // Arrange
    const mockFunction = vi.fn();
    const {container} = render(
        <ThreadCreateNew
          avatarUrl='testing-url'
          onClick={ mockFunction }
        />,
        {wrapper: MemoryRouter},
    );
    const component = container.querySelector('.thread-create-new');

    // action
    await userEvent.click(component);

    // Assert
    expect(mockFunction).toBeCalled();
  });
});
