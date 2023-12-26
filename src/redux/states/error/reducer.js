import { SET_ERROR, UNSET_ERROR } from "../../actionTypes"

const initialState = {
  isExists: false,
  type: '',
  message: ''
}

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ERROR: 
      return action.payload
    case UNSET_ERROR: 
      return initialState
    default:
      return state
  }
}