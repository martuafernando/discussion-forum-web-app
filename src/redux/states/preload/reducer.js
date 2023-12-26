import {
  SET_PRELOAD,
  UNSET_PRELOAD,
} from '../../actionTypes';

const initialState = false;

export default function preloadReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRELOAD: return true;
    case UNSET_PRELOAD: return false;
    default:
      return state;
  }
}
