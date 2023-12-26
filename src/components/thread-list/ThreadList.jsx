import {useSelector, useDispatch} from 'react-redux';
import ThreadItem from '../thread-item/ThreadItem';
import './ThreadList.css';
import PropTypes from 'prop-types';
import {
  asyncDownVoteThread,
  asyncNeutralVoteThread,
  asyncUpVoteThread,
} from '../../redux/states/threads/action';
import {useNavigate} from 'react-router-dom';
export default function ThreadList({threads}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  return (
    <div className="thread-list">
      {threads.length > 0 ? (
        threads
            .sort((thread) => thread.createdAt)
            .map((thread) => {
              return (
                <ThreadItem
                  key={thread.id}
                  thread={thread}
                  onUpVote={() =>
                    dispatch(asyncUpVoteThread(thread.id, user.id))}
                  onDownVote={() =>
                    dispatch(asyncDownVoteThread(thread.id, user.id))
                  }
                  onCancelVote={() =>
                    dispatch(asyncNeutralVoteThread(thread.id, user.id))
                  }
                  onComment={() => navigate(`thread/${thread.id}`)}
                />
              );
            })
      ) : (
        <p className="thread-list__null-announcement h4">Thread is empty</p>
      )}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.array,
};
