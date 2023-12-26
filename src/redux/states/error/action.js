import {SET_ERROR} from '../../actionTypes';

export function setError({
  type,
  message,
}) {
  return (dispatch) => {
    dispatch({
      type: SET_ERROR,
      payload: {
        isExist: true,
        type,
        message,
      },
    });
  };
}
