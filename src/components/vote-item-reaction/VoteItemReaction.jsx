import {
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaRegComment,
  FaThumbsUp,
  FaThumbsDown
} from "react-icons/fa";
import './VoteItemReaction.css'
import PropTypes, { string } from 'prop-types'
import { useSelector } from "react-redux";
export default function VoteItemReaction({
  upVotes,
  downVotes,
  totalComments,
  onUpVote,
  onDownVote,
  onComment,
  onCancelVote,
}) {
  const user = useSelector(store => store.user)
  const isLiked = upVotes.includes(user.id)
  const isDisliked = downVotes.includes(user.id)

  return (
    <div className="vote-item-reaction">
      {(upVotes !== undefined && onUpVote !== undefined) &&
        <div className="vote-item-reaction__vote">
          <button type="button">{ isLiked
            ? <FaThumbsUp onClick={ onCancelVote } />
            : <FaRegThumbsUp onClick={ onUpVote } /> }
          </button>
          <p>{ `${upVotes.length} ${upVotes.length > 1 ? 'likes' : 'like'}` }</p>
        </div>
      }
      {(downVotes !== undefined && onDownVote !== undefined) &&
        <div className="vote-item-reaction__vote">
          <button type="button">{ isDisliked
            ? <FaThumbsDown onClick={ onCancelVote } />
            : <FaRegThumbsDown onClick={ onDownVote } /> }
          </button>
          <p>{ `${downVotes.length} ${downVotes.length > 1 ? 'dislikes' : 'dislike'}` }</p>
        </div>
      }
      {(totalComments !== undefined && onComment !== undefined) && 
        <div className="vote-item-reaction__vote">
          <button><FaRegComment onClick={ onComment }/></button>
          <p>{ `${totalComments} ${totalComments > 1 ? 'comments' : 'comment'}` }</p>
        </div>
      }
    </div>
  )
}

VoteItemReaction.propTypes = {
  upVotes: PropTypes.arrayOf(string),
  downVotes: PropTypes.arrayOf(string),
  totalComments: PropTypes.number,
  onUpVote: PropTypes.func,
  onDownVote: PropTypes.func,
  onComment: PropTypes.func,
  onCancelVote: PropTypes.func,
}