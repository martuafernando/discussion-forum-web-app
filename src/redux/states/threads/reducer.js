import {
  ADD_THREAD,
  INCREASE_THREAD_DISLIKES,
  INCREASE_THREAD_LIKES,
  NEUTRAL_THREAD_VOTE,
  SET_THREADS,

} from "../../actionTypes"

const initialState = []

export default function threadReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_THREAD:  return [ action.payload, ...state ]
    case SET_THREADS: return action.payload
    case INCREASE_THREAD_LIKES: {
      const threadIndex = state.findIndex((it) => it.id === action.payload.threadId)
      const updatedThread = {
        ...state[threadIndex],
        upVotesBy: [...state[threadIndex].upVotesBy, action.payload.userId],
        downVotesBy: state[threadIndex].downVotesBy.filter((it) => it !== action.payload.userId),
      };
    
      return [
        ...state.slice(0, threadIndex),
        updatedThread,
        ...state.slice(threadIndex + 1),
      ];
    }
    case INCREASE_THREAD_DISLIKES: {
      const threadIndex = state.findIndex((it) => it.id === action.payload.threadId)
      const updatedThread = {
        ...state[threadIndex],
        upVotesBy: state[threadIndex].upVotesBy.filter((it) => it !== action.payload.userId),
        downVotesBy: [...state[threadIndex].downVotesBy, action.payload.userId],
      };
    
      return [
        ...state.slice(0, threadIndex),
        updatedThread,
        ...state.slice(threadIndex + 1),
      ];
    }
    case NEUTRAL_THREAD_VOTE: {
      const threadIndex = state.findIndex((it) => it.id === action.payload.threadId)
      const updatedThread = {
        ...state[threadIndex],
        upVotesBy: state[threadIndex].upVotesBy.filter((it) => it !== action.payload.userId),
        downVotesBy: state[threadIndex].downVotesBy.filter((it) => it !== action.payload.userId),
      };
    
      return [
        ...state.slice(0, threadIndex),
        updatedThread,
        ...state.slice(threadIndex + 1),
      ];
    }
      
    default:
      return state
  }
}