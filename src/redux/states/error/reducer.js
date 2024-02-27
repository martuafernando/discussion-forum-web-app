import {SET_MESSAGE, UNSET_MESSAGE} from '../../actionTypes';

const initialState = {
  isExists: false,
  type: '',
  message: '',
};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MESSAGE:
      return action.payload;
    case UNSET_MESSAGE:
      return initialState;
    default:
      return state;
  }
}
