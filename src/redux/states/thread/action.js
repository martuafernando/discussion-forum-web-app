import agent from "../../../utils/agent"
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { setError } from "../error/action";
import {
  ADD_COMMENT,
  INCREASE_COMMENT_DISLIKES,
  INCREASE_COMMENT_LIKES,
  NEUTRAL_COMMENT_VOTE,
  SET_THREAD
} from "../../actionTypes";

export function asyncGetDetailThread(threadId) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const response = await agent.Thread.getDetailThread(threadId);
      dispatch({
        type: SET_THREAD,
        payload: response.data.detailThread
      });
      return dispatch(hideLoading());
    } catch (error) {
      dispatch(setError({
        type: 'error',
        message: error.message
      }))
      return dispatch(hideLoading());
    }
  };
}

export function asyncCommentThread(threadId, comment) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const response = await agent.Thread.commentThread(threadId, comment);
      dispatch({
        type: ADD_COMMENT,
        payload: response.data.comment
      });
      return dispatch(hideLoading());
    } catch (error) {
      dispatch(setError({
        type: 'error',
        message: error.message
      }))
      return dispatch(hideLoading());
    }
  };
}

export function asyncUpVoteComment(threadId, commentId, userId) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      dispatch({
        type: INCREASE_COMMENT_LIKES,
        payload: { threadId, commentId, userId }
      });
      agent.Comment.upVoteComment(threadId, commentId);
      return dispatch(hideLoading());
    } catch (error) {
      dispatch(setError({
        type: 'error',
        message: error.message
      }))
      return dispatch(hideLoading());
    }
  };
}

export function asyncDownVoteComment(threadId, commentId, userId) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      dispatch({
        type: INCREASE_COMMENT_DISLIKES,
        payload: { threadId, commentId, userId }
      });
      await agent.Comment.downVoteComment(threadId, commentId);
      return dispatch(hideLoading());
    } catch (error) {
      dispatch(setError({
        type: 'error',
        message: error.message
      }))
      return dispatch(hideLoading());
    }
  };
}

export function asyncNeutralVoteComment(threadId, commentId, userId) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      dispatch({
        type: NEUTRAL_COMMENT_VOTE,
        payload: { threadId, commentId, userId }
      });
      await agent.Comment.neutralVoteComment(threadId, commentId);
      return dispatch(hideLoading());
    } catch (error) {
      dispatch(setError({
        type: 'error',
        message: error.message
      }))
      return dispatch(hideLoading());
    }
  };
}