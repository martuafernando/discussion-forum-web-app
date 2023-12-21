import React from "react";
import './DetailThreadPage.css'
import ModalLayout from "@components/layouts/modal-layout/ModalLayout";
import ThreadItem from "@components/thread-item/ThreadItem";
import SpinningCircle from "@components/spinning-circle/SpinningCircle";
import { FaXmark } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import Flash from "@components/flash/Flash";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { asyncCommentThread, asyncGetDetailThread } from "../../redux/states/thread/action";
import CommentItem from "../../components/comment-item/CommentItem";
import { FaPaperPlane } from "react-icons/fa6";

export default function DetailThreadPage() {
  const navigate = useNavigate()
  const loading = useSelector(store => store.loadingBar)
  const thread = useSelector(store => store.thread)
  const user = useSelector(store => store.user)
  const dispatch = useDispatch()
  const { threadId } = useParams()
  const [body, onBodyChanged] = useInput('')

  useEffect(() => {
    dispatch(asyncGetDetailThread(threadId))
  }, [dispatch])

  function onCloseHandler(){
    navigate('/')
  }

  function onSubmitHandler(event) {
    event.preventDefault()
    console.log('testing::MASUK')
    dispatch(asyncCommentThread(threadId, body))
  }

  return (
    <ModalLayout>
      <div className="detail-thread-page">
        <div className="detail-thread-page__title">
          <h2>Thread</h2>
          <FaXmark className="flash__close-button" onClick={onCloseHandler}/>
        </div>
        <div className="detail-thread-page__content">
          {thread.owner && <ThreadItem
            key={ thread.id }
            id={ thread.id }
            title={ thread.title }
            content={ thread.body }
            createdAt={ thread.createdAt }
            category={ thread.category }
            upVotes={ thread.upVotesBy }
            downVotes={ thread.downVotesBy }
            totalComments={ thread.totalComments }
            owner={ thread.owner }
          />}
          <hr className="detail-thread-page__divider" />
          <h4>{ thread.comments?.length > 0
            ? `${thread.comments?.length} comments`
            : 'No comments yet' }
          </h4>
          <div className="detail-thread-page__comments">
            {thread.comments?.map((it) => {
              return (
                <CommentItem
                  key={ it.id }
                  id={ it.id }
                  title={ it.title }
                  content={ it.content }
                  createdAt={ it.createdAt }
                  category={ 'testing' }
                  upVotes={ it.upVotesBy }
                  downVotes={ it.downVotesBy }
                  totalComments={ it.totalComments }
                  owner={ it.owner }
                />
              )
            })}
          </div>
        </div>
        <form className="detail-thread-page__add-comment-form" onSubmit={onSubmitHandler}>
          <Flash />
          <div className="detail-thread-page__add-comment">
            <img
              className="thread-item-author__avatar"
              src={ user.avatar }
            />
            <div
              className="textarea detail-thread-page__input-comment"
              onInput={ onBodyChanged }
              data-placeholder="What are you thinking?"
              contentEditable/>
            <button className="detail-thread-page__send-comment" type="submit"><FaPaperPlane /></button>
          </div>
        </form>
      </div>
    </ModalLayout>
  )
}