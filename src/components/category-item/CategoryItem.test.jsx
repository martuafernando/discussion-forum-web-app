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
import CategoryItem from './CategoryItem';
import userEvent from '@testing-library/user-event';

describe('CategoryItem component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should show the category display', () => {
    // Arrange
    render(
        <CategoryItem
          display="testing"
        />,
        {wrapper: MemoryRouter},
    );
    const component = screen.getByText('#testing');

    // Assert
    expect(component).toBeTruthy();
  });

  it('should call function when clicked', async () => {
    // Arrange
    const mockFunction = vi.fn()
    render(
        <CategoryItem
          display="testing"
          onClick={ mockFunction }
        />,
        {wrapper: MemoryRouter},
    );
    const component = screen.getByText('#testing');

    // Action
    await userEvent.click(component)

    // Assert
    expect(component).exist;
    expect(mockFunction).toBeCalled()
  });
});
