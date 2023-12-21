import React, { useEffect } from "react";
import ThreadList from "@components/thread-list/ThreadList";
import CategoryList from "@components/category-list/CategoryList";
import ThreadCreateNew from "@components/thread-create-new/ThreadCreateNew";
import './HomePage.css'
import LeaderboardOverviewList from "@components/leaderboard-overview-list/LeaderboardOverviewList";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asyncGetThread } from "../../redux/states/threads/action";
import { asyncGetLeaderboard } from "../../redux/states/leaderboard/action";
import { ScrollRestoration } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const threads = useSelector(store => store.threads)
  const leaderboard = useSelector(store => store.leaderboard)
  const categories = threads ? Array.from(new Set(threads.map(thread => thread.category))) : [];

  useEffect(() => {
    dispatch(asyncGetThread())
    dispatch(asyncGetLeaderboard())
  }, [dispatch])

  function onCreateThreadClickedHandler() {
    navigate('/thread/create')
  }

  return (
    <>
      <div className="home-page">
        <main className="home-page__main">
          <ThreadCreateNew
            className='home-page__thread-create-new'
            avatarUrl='https://ui-avatars.com/api/?name=testing&background=random'
            onClick={onCreateThreadClickedHandler}/>
          <ThreadList threads={ threads }/>
          <hr className="home-page__divider" />
        </main>
        <aside className="home-page__sidebar">
          <CategoryList categories={ categories } />
          <LeaderboardOverviewList leaderboard={ leaderboard.slice(0, 5) } />
        </aside>
      </div>
      <Outlet />
      <ScrollRestoration/>
    </>
  )
} 