import agent from '../../../utils/agent';
import {hideLoading, showLoading} from 'react-redux-loading-bar';
import {setMessage} from '../error/action';
import {
  SET_LEADERBOARD,
} from '../../actionTypes';

export function asyncGetLeaderboard() {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const response = await agent.Leaderboard.getLeaderboard();
      dispatch({
        type: SET_LEADERBOARD,
        payload: response.data.leaderboards,
      });
      return dispatch(hideLoading());
    } catch (error) {
      dispatch(setMessage({
        type: 'error',
        message: error.message,
      }));
      return dispatch(hideLoading());
    }
  };
}
