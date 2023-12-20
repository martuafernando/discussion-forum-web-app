import {
  SET_LEADERBOARD
} from "../../actionTypes"

const initialState = []

export default function leaderboardReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LEADERBOARD: 
      return action.payload
    default:
      return state
  }
}