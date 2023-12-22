
import './LeaderboardOverviewList.css'
import LeaderboardOverviewItem from "../leaderboard-overview-item/LeaderboardOverviewItem";
import PropTypes from "prop-types"

export default function LeaderboardOverviewList({
  leaderboard = []
}) {
  return (
    <div className="leaderboard-overview-list">
      <h2 className="leaderboard-overview-list__title">Leaderboard</h2>
      <div className="leaderboard-overview-list__content">
        { leaderboard?.map((it, index) => {
          return (
            <LeaderboardOverviewItem
              rank={ index + 1 }
              key={ it.user.id }
              name={ it.user.name }
              avatarUrl={ it.user.avatar }
              score={ it.score }
            />
          )
        }) }
      </div>
    </div>
  )
}

LeaderboardOverviewList.propTypes = {
  leaderboard: PropTypes.array.isRequired
}