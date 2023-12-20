import React from "react";
import ThreadItem from "../thread-item/ThreadItem";
import './ThreadList.css'
import PropTypes from "prop-types"

export default function ThreadList({
  threads
}) {
  return (
    <div className="thread-list">
      { threads
          .sort((thread) => thread.createdAt)
          .map((thread) => {
            return (
              <ThreadItem
                key={ thread.id }
                id={ thread.id }
                title={ thread.title }
                content={ thread.body }
                createdAt={ thread.createdAt }
                category={ thread.category }
                upVotes={ thread.upVotesBy }
                downVotes={ thread.downVotesBy }
                totalComments={ thread.totalComments }
                ownerId={ thread.ownerId }
              />
            )
          })
        }
      </div>
  )
}

ThreadList.propTypes = {
  threads: PropTypes.array
}