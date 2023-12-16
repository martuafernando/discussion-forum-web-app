import React from "react";
import './ThreadItemAuthor.css'
import PropTypes from 'prop-types'
import { calculateDifferenceDate } from "../../utils/helper";

export default function ThreadItemAuthor({
  name,
  avatarUrl,
  createdAt,
}) {
  const differenceDate = calculateDifferenceDate(createdAt)
  return (
    <div className="thread-item-author">
      <img
        className="thread-item-author__avatar"
        src={ avatarUrl }
      />
      <div className="thread-item-author__information">
        <p className="thread-item-author__name">{ name }</p>
        <p className="thread-item-author__time">{ differenceDate }</p>
      </div>
    </div>
  )
}

ThreadItemAuthor.propTypes = {
  name: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
}