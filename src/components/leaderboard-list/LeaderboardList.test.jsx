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
import LeaderboardList from './LeaderboardList';

describe('LeaderboardIList component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should show the Leaderboard Item', () => {
    // Arrange
    const leaderboard = [
      {
        rank: 1,
        user: {
          id: "users-1",
          name: "John Doe",
          avatar: "https://generated-image-url.jpg",
        },
        score: 100
      },
      {
        rank: 2,
        user: {
          id: "users-2",
          name: "John Doe",
          avatar: "https://generated-image-url.jpg",
        },
        score: 90
      },
    ]
    const { container } = render(
        <LeaderboardList
          leaderboard={leaderboard}
        />
    );
    const component = container.querySelector('.leaderboard-list');

    // Assert
    expect(component).toBeTruthy();
    expect(component.querySelectorAll('.leaderboard-item')).toHaveLength(2)
  });
});
