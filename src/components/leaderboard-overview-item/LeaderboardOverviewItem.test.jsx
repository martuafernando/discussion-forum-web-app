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
import LeaderboardOverviewItem from './LeaderboardOverviewItem';

/**
 * Testing scenario
 *
 * - LeaderboardOverviewItem component
 *  - should show the Leaderboard Overview Item
 */

describe('LeaderboardOverviewItem component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should show the Leaderboard Overview Item', () => {
    // Arrange
    const {container} = render(
        <LeaderboardOverviewItem
          rank={1}
          name="John Doe"
          avatarUrl="https://generated-image-url.jpg"
          score={100}
        />,
    );
    const component = container.querySelector('.leaderboard-overview-item');

    // Assert
    expect(component).toBeTruthy();
  });
});
