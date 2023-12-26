import agent from "../../../utils/agent"
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { SET_PRELOAD, SET_USER, UNSET_ERROR, UNSET_PRELOAD, UNSET_USER } from "../../actionTypes"
import { setError } from "../error/action"

export function asyncLoginUser(email, password) {
  return async (dispatch) => {
    try {
      dispatch(showLoading())
      const response = await agent.Auth.login(email, password)
      agent.setToken(response.data.token)
      const profile = await agent.User.getProfile()
      dispatch({
        type: SET_USER,
        payload: profile.data.user
      })
      dispatch({ type: UNSET_ERROR })
      return dispatch(hideLoading())
    } catch (error) {
      dispatch(setError({
        type: 'error',
        message: error.message
      }))
      return dispatch(hideLoading())
    }
  }
}

export function asyncRegisterUser({
  name,
  email,
  password
}) {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      await agent.Auth.register({
        name,
        email,
        password
      })
      dispatch({ type: UNSET_ERROR })
      return dispatch(hideLoading())
    } catch (error) {
      dispatch(setError({
        type: 'error',
        message: error.message
      }))
      return dispatch(hideLoading())
    }
  }
}

export function asyncGetProfile() {
  return async (dispatch) => {
    try {
      dispatch(showLoading())
      dispatch({ type: SET_PRELOAD})
      const profile = await agent.User.getProfile()
      dispatch({
        type: SET_USER,
        payload: profile.data.user
      })
      dispatch({ type: UNSET_ERROR })
      dispatch({ type: UNSET_PRELOAD})
      return dispatch(hideLoading())
    } catch (error) {
      dispatch({ type: UNSET_PRELOAD})
      dispatch(hideLoading())
      return undefined
    }
  }
}

export function logoutUser() {
  return (dispatch) => {
    try {
      dispatch(showLoading())
      agent.Auth.logout()
      dispatch({ type: UNSET_USER })
      return dispatch(hideLoading())
    } catch (error) {
      dispatch(setError({
        type: 'error',
        message: error.message
      }))
      return dispatch(hideLoading())
    }
  }
}