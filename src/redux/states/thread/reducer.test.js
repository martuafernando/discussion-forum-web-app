import {describe, it, expect} from 'vitest';
import detailThreadReducer from './reducer';
import {
  SET_THREAD,
  ADD_COMMENT,
  INCREASE_THREAD_LIKES,
  INCREASE_THREAD_DISLIKES,
  NEUTRAL_THREAD_VOTE,
  INCREASE_COMMENT_LIKES,
  INCREASE_COMMENT_DISLIKES,
  NEUTRAL_COMMENT_VOTE,
} from '../../actionTypes';

/**
 * Testing scenario
 *
 * - detailThreadReducer
 *  - should handle SET_THREAD action
 *  - should handle ADD_COMMENT action
 *  - should handle INCREASE_THREAD_LIKES action
 *  - should handle INCREASE_THREAD_DISLIKES action
 *  - should handle NEUTRAL_THREAD_VOTE action
 *  - should handle INCREASE_COMMENT_LIKES action
 *  - should handle INCREASE_COMMENT_DISLIKES action
 *  - should handle NEUTRAL_COMMENT_VOTE action
 */

describe('detailThreadReducer', () => {
  it('should handle SET_THREAD action', () => {
    // Arrange
    const initialState = {};
    const action = {
      type: SET_THREAD,
      payload: {id: 'thread-1'},
    };

    // Action
    const newState = detailThreadReducer(initialState, action);

    // Assert
    expect(newState).toEqual(action.payload);
  });

  it('should handle ADD_COMMENT action', () => {
    // Arrange
    const initialState = {
      comments: [{id: 'comment-1'}, {id: 'comment-2'}],
    };
    const action = {
      type: ADD_COMMENT,
      payload: {id: 'comment-3'},
    };

    // Action
    const newState = detailThreadReducer(initialState, action);

    // Assert
    expect(newState.comments).toContainEqual(action.payload);
    expect(newState.comments).toHaveLength(3);
  });

  it('should handle INCREASE_THREAD_LIKES action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      upVotesBy: ['user-1', 'user-2'],
      downVotesBy: ['user-3'],
      // ...other properties
    };
    const action = {
      type: INCREASE_THREAD_LIKES,
      payload: {
        threadId: 'thread-1',
        userId: 'user-4',
      },
    };

    // Action
    const newState = detailThreadReducer(initialState, action);

    // Assert
    expect(newState.upVotesBy).toContain(action.payload.userId);
    expect(newState.downVotesBy).not.toContain(action.payload.userId);
  });

  it('should handle INCREASE_THREAD_DISLIKES action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      upVotesBy: ['user-1', 'user-2'],
      downVotesBy: ['user-3'],
      // ...other properties
    };
    const action = {
      type: INCREASE_THREAD_DISLIKES,
      payload: {
        threadId: 'thread-1',
        userId: 'user-4',
      },
    };

    // Action
    const newState = detailThreadReducer(initialState, action);

    // Assert
    expect(newState.upVotesBy).not.toContain(action.payload.userId);
    expect(newState.downVotesBy).toContain(action.payload.userId);
  });

  it('should handle NEUTRAL_THREAD_VOTE action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      upVotesBy: ['user-1', 'user-2'],
      downVotesBy: ['user-3'],
      // ...other properties
    };
    const action = {
      type: NEUTRAL_THREAD_VOTE,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // Action
    const newState = detailThreadReducer(initialState, action);

    // Assert
    expect(newState.upVotesBy).not.toContain(action.payload.userId);
    expect(newState.downVotesBy).not.toContain(action.payload.userId);
  });

  it('should handle INCREASE_COMMENT_LIKES action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      comments: [
        {id: 'comment-1', upVotesBy: ['user-1'], downVotesBy: ['user-2']},
        {id: 'comment-2', upVotesBy: ['user-3'], downVotesBy: ['user-4']},
      ],
      // ...other properties
    };
    const action = {
      type: INCREASE_COMMENT_LIKES,
      payload: {
        threadId: 'thread-1',
        commentId: 'comment-1',
        userId: 'user-5',
      },
    };

    // Action
    const newState = detailThreadReducer(initialState, action);

    // Assert
    const updatedComment = newState.comments.find(
        (comment) => comment.id === action.payload.commentId,
    );
    expect(updatedComment.upVotesBy).toContain(action.payload.userId);
    expect(updatedComment.downVotesBy).not.toContain(action.payload.userId);
  });

  it('should handle INCREASE_COMMENT_DISLIKES action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      comments: [
        {id: 'comment-1', upVotesBy: ['user-1'], downVotesBy: ['user-2']},
        {id: 'comment-2', upVotesBy: ['user-3'], downVotesBy: ['user-4']},
      ],
      // ...other properties
    };
    const action = {
      type: INCREASE_COMMENT_DISLIKES,
      payload: {
        threadId: 'thread-1',
        commentId: 'comment-1',
        userId: 'user-5',
      },
    };

    // Action
    const newState = detailThreadReducer(initialState, action);

    // Assert
    const updatedComment = newState.comments.find(
        (comment) => comment.id === action.payload.commentId,
    );
    expect(updatedComment.upVotesBy).not.toContain(action.payload.userId);
    expect(updatedComment.downVotesBy).toContain(action.payload.userId);
  });

  it('should handle NEUTRAL_COMMENT_VOTE action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      comments: [
        {id: 'comment-1', upVotesBy: ['user-1'], downVotesBy: ['user-2']},
        {id: 'comment-2', upVotesBy: ['user-3'], downVotesBy: ['user-4']},
      ],
      // ...other properties
    };
    const action = {
      type: NEUTRAL_COMMENT_VOTE,
      payload: {
        threadId: 'thread-1',
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };

    // Action
    const newState = detailThreadReducer(initialState, action);

    // Assert
    const updatedComment = newState.comments.find(
        (comment) => comment.id === action.payload.commentId,
    );
    expect(updatedComment.upVotesBy).not.toContain(action.payload.userId);
    expect(updatedComment.downVotesBy).not.toContain(action.payload.userId);
  });
});
