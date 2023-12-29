import {describe, it, expect, afterEach} from 'vitest';
import {cleanup, render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import CategoryList from './CategoryList';

/**
 * Testing Scenario
 *
 * - CategoryList component
 *  - should show the categoryItem
 *  - should show the active category when clicked
 *  - should remove the remove class active when active category clicked
 */

describe('CategoryList component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should show the categoryItem', () => {
    // Arrange
    const category = ['testing-1', 'testing-2'];
    const {container} = render(<CategoryList categories={category} />, {
      wrapper: MemoryRouter,
    });

    // Action
    const component = container.getElementsByClassName('category-list');
    const child = container.getElementsByClassName('category-item');

    // Assert
    expect(component).exist;
    expect(child).toHaveLength(2);
  });

  it('should show the active category when clicked', async () => {
    // Arrange
    const category = ['testing-1', 'testing-2'];
    const {container} = render(
        <MemoryRouter initialEntries={['/']}>
          <CategoryList categories={category} />
        </MemoryRouter>,
    );

    // Action
    const categoryItem = container.querySelector('.category-item');
    await userEvent.click(categoryItem);
    const categoryItemActive = container.querySelector('.category-item.active');

    // Assert
    expect(categoryItemActive).toBeTruthy();
  });

  it('should remove class active when active category clicked', async () => {
    // Arrange
    const category = ['testing-1', 'testing-2'];
    const {container} = render(
        <MemoryRouter initialEntries={['/']}>
          <CategoryList categories={category} />
        </MemoryRouter>,
    );

    // Action
    const categoryItem = container.querySelector('.category-item');
    await userEvent.click(categoryItem);
    const categoryItemActive = container.querySelector('.category-item.active');
    await userEvent.click(categoryItemActive);

    // Assert
    expect(container.querySelector('.category-item.active')).toBeFalsy();
  });
});
