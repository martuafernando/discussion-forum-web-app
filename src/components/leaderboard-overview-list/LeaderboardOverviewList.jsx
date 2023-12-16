import React from "react";
import './LeaderboardOverviewList.css'
import LeaderboardOverviewItem from "../leaderboard-overview-item/LeaderboardOverviewItem";

export default function LeaderboardOverviewList() {
  return (
    <div className="leaderboard-overview-list">
      <h2 className="leaderboard-overview-list__title">Leaderboard</h2>
      <div className="leaderboard-overview-list__content">
        <LeaderboardOverviewItem
          name='testing'
          avatarUrl='https://ui-avatars.com/api/?name=testing&background=random'
          rank='1'
          score='10'
        />
        <LeaderboardOverviewItem
          name='testing'
          avatarUrl='https://ui-avatars.com/api/?name=testing&background=random'
          rank='1'
          score='10'
        />
      </div>
    </div>
  )
}