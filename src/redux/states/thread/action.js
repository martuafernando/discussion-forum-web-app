import agent from "../../../utils/agent"
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { setError } from "../error/action";
import {
  ADD_THREAD,
  INCREASE_THREAD_DISLIKES,
  INCREASE_THREAD_LIKES,
  NEUTRAL_THREAD_VOTE,
  SET_THREAD
} from "../../actionTypes";

export function asyncCreateThread({ title, category, body, user, onSuccessCallback }) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const response = await agent.Thread.createThread({ title, category, body });
      dispatch({
        type: ADD_THREAD,
        payload: {
          ...response.data.thread,
          owner: user
        }
      });
      onSuccessCallback()
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

export function asyncGetThread() {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const [ threadResponse, userResponse ] = await Promise.all([
        agent.Thread.getThread(),
        agent.User.getUsers(),
      ]);
      const threads = threadResponse.data.threads.map((thread) => {
        return {
          ...thread,
          owner: userResponse.data.users.find((user) => user.id === thread.ownerId)
        }
      })
      dispatch({
        type: SET_THREAD,
        payload: threads
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

export function upVoteThread(threadId, userId) {
  return async (dispatch) => {
    dispatch({
      type: INCREASE_THREAD_LIKES,
      payload: { threadId, userId }
    });

    try {
      dispatch(showLoading());
      agent.Thread.upVoteThread(threadId);
      return dispatch(hideLoading());
    } catch (error) {
      dispatch(setError({
        type: 'error',
        message: error.message
      }))
      dispatch({
        type: NEUTRAL_THREAD_VOTE,
        payload: { threadId, userId }
      });
      return dispatch(hideLoading());
    }
  };
}

export function downVoteThread(threadId, userId) {
  return async (dispatch) => {
    dispatch({
      type: INCREASE_THREAD_DISLIKES,
      payload: { threadId, userId }
    });

    try {
      dispatch(showLoading());
      await agent.Thread.downVoteThread(threadId);
      return dispatch(hideLoading());
    } catch (error) {
      dispatch(setError({
        type: 'error',
        message: error.message
      }))
      dispatch({
        type: NEUTRAL_THREAD_VOTE,
        payload: { threadId, userId }
      });
      return dispatch(hideLoading());
    }
  };
}

export function neutralVoteThread(threadId, userId) {
  return async (dispatch) => {
    dispatch({
      type: NEUTRAL_THREAD_VOTE,
      payload: { threadId, userId }
    });

    try {
      dispatch(showLoading());
      await agent.Thread.neutralVoteThread(threadId);
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