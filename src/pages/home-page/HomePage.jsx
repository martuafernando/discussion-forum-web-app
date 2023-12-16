import React from "react";
import ThreadList from "@components/thread-list/ThreadList";
import CategoryList from "@components/category-list/CategoryList";
import ThreadCreateNew from "@components/thread-create-new/ThreadCreateNew";
import './HomePage.css'
import LeaderboardOverviewList from "@components/leaderboard-overview-list/LeaderboardOverviewList";

export default function HomePage() {
  return (
    <div className="home-page">
      <main className="home-page__main">
        <ThreadCreateNew
          className='home-page__thread-create-new'
          avatarUrl='https://ui-avatars.com/api/?name=testing&background=random'/>
        <ThreadList />
        <hr className="home-page__divider" />
      </main>
      <aside className="home-page__sidebar">
        <CategoryList />
        <LeaderboardOverviewList />
      </aside>
    </div>
  )
} 