import React from "react";
import CategoryItem from "../category-item/CategoryItem";
import './CategoryList.css'

export default function CategoryList({

}) {
  return (
    <div className="category-list">
      <h2 className="category-list__title">Category</h2>
      <div className="category-list__content">
        <CategoryItem
          display='General'
        />
        <CategoryItem
          display='Teknologi'
        />
      </div>
    </div>
  )
}