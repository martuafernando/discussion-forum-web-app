
import './CommentItem.css'
import ItemAuthor from "../item-author/ItemAuthor"
import VoteItemReaction from "../vote-item-reaction/VoteItemReaction"
import PropTypes from 'prop-types'
import parser from 'html-react-parser'
export default function CommentItem({
  comment,
  onUpVote,
  onDownVote,
  onCancelVote,
}) {
  return (
    <div className="comment-item">
      <div className="comment-item__author-reaction">
        <ItemAuthor
          name={ comment.owner.name }
          avatarUrl={ comment.owner.avatar }
          createdAt={ comment.createdAt }
        />
        <VoteItemReaction 
          upVotes={ comment.upVotesBy }
          downVotes={ comment.downVotesBy }
          onUpVote={ onUpVote }
          onDownVote={ onDownVote }
          onCancelVote={ onCancelVote }
        />
      </div>
      <div className="comment-item__content">{ comment.content && parser(comment.content) }</div>
    </div>
  )
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onCancelVote: PropTypes.func.isRequired,
}