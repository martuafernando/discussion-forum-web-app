import {
  SET_USER,
  REMOVE_USER
} from "../../actionTypes"

const initialState = {}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER: 
      return {
        ...state,
        user: action.payload
      }
    case REMOVE_USER: 
      return {
        ...state,
        user: undefined
      }
    default:
      return state
  }
}