import React from "react";
import './ThreadItem.css'
import ThreadItemAuthor from "../thread-item-author/ThreadItemAuthor"
import ThreadItemReaction from "../thread-item-reaction/ThreadItemReaction";
import PropTypes, { string } from 'prop-types'
import CategoryItem from "../category-item/CategoryItem";
export default function ThreadItem({
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
      <p className="thread-item__content">{ content }</p>
      <div className="thread-item__author-reaction">
        <ThreadItemAuthor
          name='Testing dulu ya gak sih'
          avatarUrl='https://ui-avatars.com/api/?name=testing&background=random'
          createdAt={ createdAt }
        />
        <ThreadItemReaction 
          upVotes={ upVotes }
          downVotes={ downVotes }
          totalComments={ totalComments }
        />
      </div>
    </div>
  )
}

ThreadItem.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  upVotes: PropTypes.arrayOf(string).isRequired,
  downVotes: PropTypes.arrayOf(string).isRequired,
  totalComments: PropTypes.string.isRequired,
}