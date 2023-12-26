
import CategoryItem from "../category-item/CategoryItem"
import './CategoryList.css'
import PropTypes from "prop-types"

export default function CategoryList({
  categories
}) {
  return (
    <div className="category-list">
      <h2 className="category-list__title">Category</h2>
      <div className="category-list__content">
        { categories?.map((category) => {
          return (
            <CategoryItem
              key={ category }
              display={ category }
            />
          )
        }) }
      </div>
    </div>
  )
}

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired
}