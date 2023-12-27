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
import LeaderboardItem from './LeaderboardItem';

describe('LeaderboardItem component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should show the Leaderboard Item', () => {
    // Arrange
    const { container } = render(
        <LeaderboardItem
          rank={1}
          user={ {
            id: "users-1",
            name: "John Doe",
            avatar: "https://generated-image-url.jpg",
          } }
          score={100}
        />
    );
    const component = container.querySelector('.leaderboard-item');

    // Assert
    expect(component).toBeTruthy();
  });
});
