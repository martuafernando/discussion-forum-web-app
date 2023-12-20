import React, { useEffect } from "react";
import ThreadList from "@components/thread-list/ThreadList";
import CategoryList from "@components/category-list/CategoryList";
import ThreadCreateNew from "@components/thread-create-new/ThreadCreateNew";
import './HomePage.css'
import LeaderboardOverviewList from "@components/leaderboard-overview-list/LeaderboardOverviewList";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asyncGetThread } from "../../redux/states/thread/action";

export default function HomePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const threads = useSelector(store => store.threads)
  const categories = threads ? threads.map(thread => thread.category) : []

  useEffect(() => {
    dispatch(asyncGetThread())
  }, [dispatch])

  function onCreateThreadClickedHandler() {
    navigate('/create-thread')
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
          <LeaderboardOverviewList />
        </aside>
      </div>
      <Outlet />
    </>
  )
} 