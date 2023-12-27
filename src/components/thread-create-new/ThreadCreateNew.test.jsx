import {
  describe,
  it,
  expect,
  afterEach,
} from 'vitest';
import {
  cleanup,
  render,
  screen,
} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import ThreadCreateNew from './ThreadCreateNew';

describe('ThreadCreateNew component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should show the ThreadCreateNew display', () => {
    // Arrange
    const { container } = render(
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

  it('should show the ThreadCreateNew display', async () => {
    // Arrange
    const mockFunction = vi.fn()
    const { container } = render(
        <ThreadCreateNew
          avatarUrl='testing-url'
          onClick={ mockFunction }
        />,
        {wrapper: MemoryRouter},
    );
    const component = container.querySelector('.thread-create-new');

    // action
    await userEvent.click(component)

    // Assert
    expect(mockFunction).toBeCalled()
  });
});
