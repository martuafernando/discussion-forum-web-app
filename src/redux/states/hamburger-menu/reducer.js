import {
  OPEN_HAMBURGER_MENU,
  CLOSE_HAMBURGER_MENU,
} from '../../actionTypes';

const initialState = false;

export default function hamburgerMenuReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_HAMBURGER_MENU: return true;
    case CLOSE_HAMBURGER_MENU: return false;
    default:
      return state;
  }
}
