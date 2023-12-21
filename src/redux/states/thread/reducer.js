import {
  ADD_COMMENT,
  SET_THREAD
} from "../../actionTypes"

const initialState = {}

export default function detailThreadReducer(state = initialState, action) {
  switch (action.type) {
    case SET_THREAD: 
      return action.payload
    case ADD_COMMENT: {
      const newThread = {}
      Object.assign(newThread, state)
      newThread.comments.push(action.payload)
      return newThread
    }
    default:
      return state
  }
}