import React from "react";
import './CategoryItem.css'
import { Link } from "react-router-dom";

export default function CategoryItem({
  display,
  onClick,
}) {
  return (
    <Link className="category-item badge" type="button">#{ display }</Link>
  )
}