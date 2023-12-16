import { SET_ERROR, UNSET_ERROR } from "../../actionTypes";

export function setError({
  type,
  message,
}){
  return (dispatch) => {
    dispatch({
      type: SET_ERROR,
      payload: {
        isExist: true,
        type,
        message
      }
    });
  }
}

export const unsetError = dispatch => dispatch({ type: UNSET_ERROR })