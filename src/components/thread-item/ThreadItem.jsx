import React from "react";
import './ThreadItem.css'
import ThreadItemAuthor from "../thread-item-author/ThreadItemAuthor"
import ThreadItemReaction from "../thread-item-reaction/ThreadItemReaction";
import PropTypes, { string } from 'prop-types'
import CategoryItem from "../category-item/CategoryItem";
import parser from 'html-react-parser'
export default function ThreadItem({
  id,
  title,
  content,
  category,
  createdAt,
  ownerId,
  upVotes,
  downVotes,
  totalComments,
}) {
  return (
    <div className="thread-item">
      <h3 className="thread-item__title">{title}</h3>
      <CategoryItem
        className='thread-item__category'
        display={ category }/>
      <div className="thread-item__content">{ content && parser(content) }</div>
      <div className="thread-item__author-reaction">
        <ThreadItemAuthor
          name='Testing dulu ya gak sih'
          avatarUrl='https://ui-avatars.com/api/?name=testing&background=random'
          createdAt={ createdAt }
        />
        <ThreadItemReaction 
          threadId={ id }
          upVotes={ upVotes }
          downVotes={ downVotes }
          totalComments={ totalComments }
        />
      </div>
    </div>
  )
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  upVotes: PropTypes.arrayOf(string).isRequired,
  downVotes: PropTypes.arrayOf(string).isRequired,
  totalComments: PropTypes.number.isRequired,
}