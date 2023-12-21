import agent from "../../../utils/agent"
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { setError } from "../error/action";
import {
  ADD_COMMENT,
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