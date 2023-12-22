
import './ItemAuthor.css'
import PropTypes from 'prop-types'
import { calculateDifferenceDate } from "../../utils/helper";

export default function ItemAuthor({
  name,
  avatarUrl,
  createdAt,
}) {
  const differenceDate = calculateDifferenceDate(createdAt)
  return (
    <div className="item-author">
      <img
        className="item-author__avatar"
        src={ avatarUrl }
      />
      <div className="item-author__information">
        <p className="item-author__name">{ name }</p>
        <p className="item-author__time">{ differenceDate }</p>
      </div>
    </div>
  )
}

ItemAuthor.propTypes = {
  name: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
}