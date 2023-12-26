
import './CategoryItem.css'
import { Link } from "react-router-dom";
import { stringToColor } from "../../utils/helper";
import PropTypes from "prop-types"

export default function CategoryItem({
  className,
  display,
  urlDestination,
}) {
  return (
    <Link
      to={ urlDestination }
      className={`category-item badge ${ className }`}
      style={{backgroundColor: `${stringToColor(display)}`}}
      >#{ display }
    </Link>
  )
}

CategoryItem.propTypes = {
  className: PropTypes.string,
  display: PropTypes.string.isRequired,
  urlDestination: PropTypes.string
}