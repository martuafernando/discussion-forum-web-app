import './DetailThreadPage.css'
import ModalLayout from "@components/layouts/modal-layout/ModalLayout";
import ThreadItem from "@components/thread-item/ThreadItem";
import { FaXmark, FaPaperPlane } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import Flash from "@components/flash/Flash";
import { useNavigate, useParams } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { useEffect } from "react";
import { asyncCommentThread, asyncDownVoteComment, asyncGetDetailThread, asyncNeutralVoteComment, asyncUpVoteComment } from "../../redux/states/thread/action";
import CommentItem from "../../components/comment-item/CommentItem";
import {
  asyncDownVoteThread,
  asyncNeutralVoteThread,
  asyncUpVoteThread
} from '../../redux/states/threads/action';

export default function DetailThreadPage() {
  const navigate = useNavigate()
  const thread = useSelector(store => store.thread)
  const user = useSelector(store => store.user)
  const dispatch = useDispatch()
  const { threadId } = useParams()
  const [body, onBodyChanged] = useInput('')

  useEffect(() => {
    dispatch(asyncGetDetailThread(threadId))
  }, [dispatch])

  function onSubmitHandler(event) {
    event.preventDefault()
    dispatch(asyncCommentThread(threadId, body))
  }

  return (
    <ModalLayout>
      <div className="detail-thread-page">
        <Flash className="detail-thread-page__flash" />
        <div className="detail-thread-page__title">
          <h2>Thread</h2>
          <FaXmark className="flash__close-button" onClick={ () => navigate('/') }/>
        </div>
        <div className="detail-thread-page__content">
          {thread.owner && <ThreadItem
            key={ thread.id }
            thread={ thread }
            onUpVote={ () => dispatch(asyncUpVoteThread(thread.id, user.id)) }
            onDownVote={ () => dispatch(asyncDownVoteThread(thread.id, user.id)) }
            onCancelVote={ () => dispatch(asyncNeutralVoteThread(thread.id, user.id)) }
          />}
          <hr className="detail-thread-page__divider" />
          <h4>{ thread.comments?.length > 0
            ? thread.comments?.length > 1 ? `${thread.comments?.length} comments` : `${thread.comments?.length} comment`
            : 'No comments yet' }
          </h4>
          <div className="detail-thread-page__comments">
            {thread.comments?.map((comment) => {
              return (
                <CommentItem
                  key={ comment.id }
                  comment={ comment }
                  onUpVote={ () => dispatch(asyncUpVoteComment(thread.id, comment.id, user.id)) }
                  onDownVote={ () => dispatch(asyncDownVoteComment(thread.id, comment.id, user.id)) }
                  onCancelVote={ () => dispatch(asyncNeutralVoteComment(thread.id, comment.id, user.id)) }
                />
              )
            })}
          </div>
        </div>
        <form className="detail-thread-page__add-comment-form" onSubmit={onSubmitHandler}>
          <Flash />
          <div className="detail-thread-page__add-comment">
            <img
              className="item-author__avatar"
              src={ user.avatar }
            />
            <div
              className="textarea detail-thread-page__input-comment"
              onInput={ onBodyChanged }
              data-placeholder="Your comment..."
              contentEditable/>
            <button className="detail-thread-page__send-comment" type="submit"><FaPaperPlane /></button>
          </div>
        </form>
      </div>
    </ModalLayout>
  )
}