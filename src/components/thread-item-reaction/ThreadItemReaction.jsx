import React from "react";
import {
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaRegComment,
  FaThumbsUp,
  FaThumbsDown
} from "react-icons/fa";
import './ThreadItemReaction.css'
import PropTypes, { string } from 'prop-types'
import { useSelector, useDispatch } from "react-redux";
import { downVoteThread, neutralVoteThread, upVoteThread } from "../../redux/states/threads/action";
import { useNavigate } from "react-router-dom";
export default function ThreadItemReaction({
  threadId,
  upVotes,
  downVotes,
  totalComments,
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)
  const isLiked = upVotes.includes(user.id)
  const isDisliked = downVotes.includes(user.id)

  return (
    <div className="thread-item-reaction">
      {upVotes !== undefined &&
        <div className="thread-item-reaction__vote">
          <button type="button">{ isLiked
            ? <FaThumbsUp onClick={() => dispatch(neutralVoteThread(threadId, user.id))} />
            : <FaRegThumbsUp onClick={() => dispatch(upVoteThread(threadId, user.id))} /> }
          </button>
          <p>{ upVotes.length } likes</p>
        </div>
      }
      {downVotes !== undefined &&
        <div className="thread-item-reaction__vote">
          <button type="button">{ isDisliked
            ? <FaThumbsDown onClick={() => dispatch(neutralVoteThread(threadId, user.id))} />
            : <FaRegThumbsDown onClick={() => dispatch(downVoteThread(threadId, user.id))} /> }
          </button>
          <p>{ downVotes.length } dislikes</p>
        </div>
      }
      {totalComments !== undefined && 
        <div className="thread-item-reaction__vote">
          <button><FaRegComment onClick={() => navigate(`/thread/${threadId}`)}/></button>
          <p>{ totalComments } comments</p>
        </div>
      }
    </div>
  )
}

ThreadItemReaction.propTypes = {
  threadId: PropTypes.string.isRequired,
  upVotes: PropTypes.arrayOf(string),
  downVotes: PropTypes.arrayOf(string),
  totalComments: PropTypes.number,
}