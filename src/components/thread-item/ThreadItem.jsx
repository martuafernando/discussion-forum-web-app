import './ThreadItem.css';
import ItemAuthor from '../item-author/ItemAuthor';
import VoteItemReaction from '../vote-item-reaction/VoteItemReaction';
import PropTypes from 'prop-types';
import CategoryItem from '../category-item/CategoryItem';
import parser from 'html-react-parser';
export default function ThreadItem({
  thread,
  onUpVote,
  onDownVote,
  onCancelVote,
  onComment,
}) {
  return (
    <div className="thread-item">
      <h3 className="thread-item__title">{thread.title}</h3>
      <CategoryItem
        className="thread-item__category"
        display={thread.category}
      />
      <div className="thread-item__content">
        {thread.body && parser(thread.body)}
      </div>
      <div className="thread-item__author-reaction">
        <ItemAuthor
          name={thread.owner.name}
          avatarUrl={thread.owner.avatar}
          createdAt={thread.createdAt}
        />
        <VoteItemReaction
          upVotes={thread.upVotesBy}
          downVotes={thread.downVotesBy}
          totalComments={thread.totalComments}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
          onCancelVote={onCancelVote}
          onComment={onComment}
        />
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  thread: PropTypes.object.isRequired,
  onUpVote: PropTypes.func,
  onDownVote: PropTypes.func,
  onCancelVote: PropTypes.func,
  onComment: PropTypes.func,
};
