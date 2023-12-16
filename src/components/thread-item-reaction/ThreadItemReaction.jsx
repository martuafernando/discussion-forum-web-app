import React from "react";
import {
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaRegComment
} from "react-icons/fa";
import './ThreadItemReaction.css'
import PropTypes, { string } from 'prop-types'

export default function ThreadItemReaction({
  upVotes = [],
  downVotes = [],
  totalComments = 0,
}) {
  return (
    <div className="thread-item-reaction">
      <div className="thread-item-reaction__vote">
        <button type="button"><FaRegThumbsUp /></button>
        <p>{ upVotes.length } likes</p>
      </div>
      <div className="thread-item-reaction__vote">
        <button type="button"><FaRegThumbsDown /></button>
        <p>{ downVotes.length } dislikes</p>
      </div>
      <div className="thread-item-reaction__vote">
        <button type="button"><FaRegComment /></button>
        <p>{ totalComments } comments</p>
      </div>
    </div>
  )
}

ThreadItemReaction.propTypes = {
  upVotes: PropTypes.arrayOf(string).isRequired,
  downVotes: PropTypes.arrayOf(string).isRequired,
  totalComments: PropTypes.string.isRequired,
}