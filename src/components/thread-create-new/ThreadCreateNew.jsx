import React from "react";
import './ThreadCreateNew.css'
import PropTypes from "prop-types"

export default function ThreadCreateNew({
  className,
  avatarUrl
}) {
  return (
    <div className={ `thread-create-new ${className}` }>
      <img
        className="thread-item-author__avatar"
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
  avatarUrl: PropTypes.string.isRequired
}