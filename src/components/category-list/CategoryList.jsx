
import { useNavigate } from "react-router-dom"
import useQuery from "../../hooks/useQuery"
import CategoryItem from "../category-item/CategoryItem"
import './CategoryList.css'
import PropTypes from "prop-types"

export default function CategoryList({
  categories
}) {
  const query = useQuery()
  const navigate = useNavigate()
  const currentCategory = query.get('category')

  function onCategoryItemSelected(category) {
    switch (!!query.get('category')) {
      case true:
        query.set('category', '')
        break
      case false:
        query.set('category', category)
        break
    }
    navigate(`/?${query}`)
  }
  return (
    <div className="category-list">
      <h2 className="category-list__title">Category</h2>
      <div className="category-list__content">
        { categories?.map((category) => {
          return (
            <CategoryItem
              key={ category }
              display={ category }
              className={ currentCategory === category ? 'active' : '' }
              onClick={ () => onCategoryItemSelected(category) }
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