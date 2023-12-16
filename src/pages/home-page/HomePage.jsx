import React from "react";
import ThreadList from "../../components/thread-list/ThreadList";
import CategoryList from "../../components/category-list/CategoryList";
import './HomePage.css'

export default function HomePage() {
  return (
    <div className="home-page">
      <main className="home-page__main">
        <ThreadList />
      </main>
      <aside className="home-page__sidebar">
        <CategoryList />
      </aside>
    </div>
  )
} 