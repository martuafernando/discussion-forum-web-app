import './LeaderboardItem.css';
import PropTypes from 'prop-types';

export default function LeaderboardItem({
  rank,
  user,
  score,
}) {
  return (
    <div className="leaderboard-item">
      <p className="leaderboard-item__rank h3">{ `#${ rank }` }</p>
      <div className="leaderboard-item__user">
        <img
          className="leaderboard-item__user-avatar"
          src={ user.avatar }
        />
        <div className="leaderboard-item__user-information">
          <p className="leaderboard-item__user-id">{ user.id }</p>
          <p className="leaderboard-item__user-name h4">{ user.name }</p>
          <p className="leaderboard-item__user-email">{ user.email }</p>
        </div>
      </div>
      <p className="leaderboard-item__score badge h4">{ score }</p>
    </div>
  );
}

LeaderboardItem.propTypes = {
  rank: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  score: PropTypes.number.isRequired,
};
