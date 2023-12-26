
import PropTypes from 'prop-types';
import './LeaderboardOverviewItem.css';

export default function LeaderboardOverviewItem({
  rank,
  name,
  avatarUrl,
  score,
}) {
  return (
    <div className="leaderboard-overview-item">
      <div>
        <p className="leaderboard-overview-item__rank">{ rank }</p>
        <img
          className="leaderboard-overview-item__avatar"
          src={ avatarUrl }
        />
        <p className="leaderboard-overview-item__name">{ name }</p>
      </div>
      <p className="leaderboard-overview-item__score badge">{ score }</p>
    </div>
  );
}

LeaderboardOverviewItem.propTypes = {
  rank: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
