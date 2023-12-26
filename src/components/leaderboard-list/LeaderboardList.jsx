import LeaderboardItem from '../leaderboard-item/LeaderboardItem';
import './LeaderboardList.css';
import PropTypes from 'prop-types';

export default function LeaderboardList({
  leaderboard,
}) {
  return (
    <div className="leaderboard-list">
      <h3 className='leaderboard-list__title'>Leaderboard</h3>
      <div className="leaderboard-list__content">
        {leaderboard?.map((it, rank) => {
          return (
            <LeaderboardItem
              key={ it.user.id }
              rank={ rank + 1 }
              user={ it.user }
              score={ it.score }
            />
          );
        })}
      </div>
    </div>
  );
}

LeaderboardList.propTypes = {
  leaderboard: PropTypes.array.isRequired,
};
