
import useQuery from "../../hooks/useQuery"
import CategoryItem from "../category-item/CategoryItem"
import './CategoryList.css'
import PropTypes from "prop-types"

export default function CategoryList({
  categories
}) {
  const query = useQuery()
  const currentCategory = query.get('category')
  return (
    <div className="category-list">
      <h2 className="category-list__title">Category</h2>
      <div className="category-list__content">
        { categories?.map((category) => {
          query.set('category', category)
          return (
            <CategoryItem
              key={ category }
              display={ category }
              className={ currentCategory === category ? 'active' : '' }
              urlDestination={ `/?${query}` }
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