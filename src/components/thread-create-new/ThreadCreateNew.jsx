
import './ThreadCreateNew.css'
import PropTypes from "prop-types"

export default function ThreadCreateNew({
  className,
  avatarUrl,
  onClick,
}) {
  return (
    <div className={ `thread-create-new ${className}` } onClick={onClick}>
      <img
        className="item-author__avatar"
        src={ avatarUrl }
      />
      <input
        type="text"
        placeholder="What are you thinking?"
      />
    </div>
  )

}

ThreadCreateNew.propTypes = {
  className: PropTypes.string,
  avatarUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}