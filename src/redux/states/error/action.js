import {SET_MESSAGE} from '../../actionTypes';

export function setMessage({
  type,
  message,
}) {
  return (dispatch) => {
    dispatch({
      type: SET_MESSAGE,
      payload: {
        isExists: true,
        type,
        message,
      },
    });
  };
}
