import {
  ADD_COMMENT,
  SET_THREAD,
  INCREASE_THREAD_LIKES,
  INCREASE_THREAD_DISLIKES,
  NEUTRAL_THREAD_VOTE,
  INCREASE_COMMENT_LIKES,
  INCREASE_COMMENT_DISLIKES,
  NEUTRAL_COMMENT_VOTE,
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
    case INCREASE_THREAD_LIKES: {
      if (action.payload.threadId === state.id) {
        const updatedThread = {
          ...state,
          upVotesBy: [...state.upVotesBy, action.payload.userId],
          downVotesBy: state.downVotesBy.filter((it) => it !== action.payload.userId),
        }
        return updatedThread
      }
      return state
    }
    case INCREASE_THREAD_DISLIKES: {
      if (action.payload.threadId === state.id) {
        const updatedThread = {
          ...state,
          upVotesBy: state.upVotesBy.filter((it) => it !== action.payload.userId),
          downVotesBy: [...state.downVotesBy, action.payload.userId],
        }
        return updatedThread
      }
      return state
    }
    case NEUTRAL_THREAD_VOTE: {
      if (action.payload.threadId === state.id) {
        const updatedThread = {
          ...state,
          upVotesBy: state.upVotesBy.filter((it) => it !== action.payload.userId),
          downVotesBy: state.downVotesBy.filter((it) => it !== action.payload.userId),
        };
        return updatedThread
      }
      return state
    }

    case INCREASE_COMMENT_LIKES: {
      if (action.payload.threadId === state.id) {
        const commentIndex = state.comments.findIndex((it) => it.id === action.payload.commentId)
        const updatedComment = {
          ...state.comments[commentIndex],
          upVotesBy: [...state.comments[commentIndex].upVotesBy, action.payload.userId],
          downVotesBy: state.comments[commentIndex].downVotesBy.filter((it) => it !== action.payload.userId),
        };
        const updatedThread = {
          ...state,
          comments: [
            ...state.comments.slice(0, commentIndex),
            updatedComment,
            ...state.comments.slice(commentIndex + 1),
          ]
        }
        return updatedThread
      }
      return state
    }
    case INCREASE_COMMENT_DISLIKES: {
      if (action.payload.threadId === state.id) {
        const commentIndex = state.comments.findIndex((it) => it.id === action.payload.commentId)
        const updatedComment = {
          ...state.comments[commentIndex],
          upVotesBy: state.comments[commentIndex].upVotesBy.filter((it) => it !== action.payload.userId),
          downVotesBy: [...state.comments[commentIndex].downVotesBy, action.payload.userId],
        };
        const updatedThread = {
          ...state,
          comments: [
            ...state.comments.slice(0, commentIndex),
            updatedComment,
            ...state.comments.slice(commentIndex + 1),
          ]
        }
        return updatedThread
      }
      return state
    }
    case NEUTRAL_COMMENT_VOTE: {
      if (action.payload.threadId === state.id) {
        const commentIndex = state.comments.findIndex((it) => it.id === action.payload.commentId)
        const updatedComment = {
          ...state.comments[commentIndex],
          upVotesBy: state.comments[commentIndex].upVotesBy.filter((it) => it !== action.payload.userId),
          downVotesBy: state.comments[commentIndex].downVotesBy.filter((it) => it !== action.payload.userId),
        };
        const updatedThread = {
          ...state,
          comments: [
            ...state.comments.slice(0, commentIndex),
            updatedComment,
            ...state.comments.slice(commentIndex + 1),
          ]
        }
        return updatedThread
      }
      return state
    }
    default:
      return state
  }
}