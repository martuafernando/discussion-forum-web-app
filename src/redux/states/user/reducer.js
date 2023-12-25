import {
  SET_USER,
  UNSET_USER
} from "../../actionTypes"

const initialState = {}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER: 
      return action.payload
    case UNSET_USER: 
      return {}
    default:
      return state
  }
}