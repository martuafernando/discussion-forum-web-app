import React from "react";
import './CommentItem.css'
import ThreadItemAuthor from "../thread-item-author/ThreadItemAuthor"
import ThreadItemReaction from "../thread-item-reaction/ThreadItemReaction";
import PropTypes, { string } from 'prop-types'
import parser from 'html-react-parser'
export default function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotes,
  downVotes,
}) {
  return (
    <div className="comment-item">
      <div className="comment-item__author-reaction">
        <ThreadItemAuthor
          name={ owner.name }
          avatarUrl={ owner.avatar }
          createdAt={ createdAt }
        />
        <ThreadItemReaction 
          threadId={ id }
          upVotes={ upVotes }
          downVotes={ downVotes }
        />
      </div>
      <div className="comment-item__content">{ content && parser(content) }</div>
    </div>
  )
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.object.isRequired,
  upVotes: PropTypes.arrayOf(string).isRequired,
  downVotes: PropTypes.arrayOf(string).isRequired,
}