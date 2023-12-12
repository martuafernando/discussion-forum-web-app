import agent from "../../../utils/agent"
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { SET_USER } from "../../actionTypes";

export function asyncLoginUser(email, password) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const response = await agent.Auth.login(email, password);
      agent.setToken(response.data.token)
      const profile = await agent.User.getProfile();
      dispatch({
        type: SET_USER,
        payload: profile.data.user
      });
      return dispatch(hideLoading());
    } catch (error) {
      alert(error.message);
    }
  };
}

export function asyncRegisterUser({
  name,
  email,
  password
}) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await agent.Auth.register({
        name,
        email,
        password
      });
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}