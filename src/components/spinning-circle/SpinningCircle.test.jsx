import {
  describe,
  it,
  expect,
  afterEach,
} from 'vitest';
import {
  cleanup,
  render,
} from '@testing-library/react';
import SpinningCircle from './SpinningCircle';

describe('Navigation component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should show the navigation', () => {
    // Arrange
    const { container } = render(
      <SpinningCircle />
    );
    const component = container.querySelector('.spinning-circle');

    // Assert
    expect(component).toBeTruthy();
  });
});
