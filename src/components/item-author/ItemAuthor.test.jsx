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
import ItemAuthor from './ItemAuthor';

describe('ItemAuthor component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should show the ItemAuthor', () => {
    // Arrange
    const { container } = render(
        <ItemAuthor
          name='testing-name'
          avatarUrl='testing-url'
          createdAt='2021-06-21T07:00:00.000Z'
        />
    );
    const component = container.querySelector('.item-author');

    // Assert
    expect(component).toBeTruthy();
  });
});
