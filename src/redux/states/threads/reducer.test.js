import {describe, it, expect} from 'vitest';
import threadReducer from './reducer';
import {
  ADD_THREAD,
  INCREASE_THREAD_DISLIKES,
  INCREASE_THREAD_LIKES,
  NEUTRAL_THREAD_VOTE,
  SET_THREADS,
} from '../../actionTypes';

/**
 * Testing scenario
 *
 * - threadReducer
 *  - should handle ADD_THREAD
 *  - should handle SET_THREADS
 *  - should handle INCREASE_THREAD_LIKES
 *  - should handle INCREASE_THREAD_DISLIKES
 *  - should handle NEUTRAL_THREAD_VOTE
 *  - should handle unknown action type
 */

describe('threadReducer', () => {
  it('should handle ADD_THREAD', () => {
    const initialState = [];
    const action = {
      type: ADD_THREAD,
      payload: {id: 1, title: 'New Thread', userId: 123},
    };

    const nextState = threadReducer(initialState, action);

    expect(nextState).toEqual([{id: 1, title: 'New Thread', userId: 123}]);
  });

  it('should handle SET_THREADS', () => {
    const initialState = [];
    const action = {
      type: SET_THREADS,
      payload: [
        {id: 1, title: 'Thread 1'},
        {id: 2, title: 'Thread 2'},
      ],
    };

    const nextState = threadReducer(initialState, action);

    expect(nextState).toEqual([
      {id: 1, title: 'Thread 1'},
      {id: 2, title: 'Thread 2'},
    ]);
  });

  it('should handle INCREASE_THREAD_LIKES', () => {
    const initialState = [{id: 1, upVotesBy: [], downVotesBy: []}];
    const action = {
      type: INCREASE_THREAD_LIKES,
      payload: {threadId: 1, userId: 123},
    };

    const nextState = threadReducer(initialState, action);

    expect(nextState).toEqual([{id: 1, upVotesBy: [123], downVotesBy: []}]);
  });

  it('should handle INCREASE_THREAD_DISLIKES', () => {
    const initialState = [{id: 1, upVotesBy: [], downVotesBy: []}];
    const action = {
      type: INCREASE_THREAD_DISLIKES,
      payload: {threadId: 1, userId: 456},
    };

    const nextState = threadReducer(initialState, action);

    expect(nextState).toEqual([{id: 1, upVotesBy: [], downVotesBy: [456]}]);
  });

  it('should handle NEUTRAL_THREAD_VOTE', () => {
    const initialState = [{id: 1, upVotesBy: [123], downVotesBy: [456]}];
    const action = {
      type: NEUTRAL_THREAD_VOTE,
      payload: {threadId: 1, userId: 123},
    };

    const nextState = threadReducer(initialState, action);

    expect(nextState).toEqual([{id: 1, upVotesBy: [], downVotesBy: [456]}]);
  });

  it('should handle unknown action type', () => {
    const initialState = [{id: 1, title: 'Thread 1'}];
    const action = {
      type: 'UNKNOWN_ACTION',
      payload: {data: 'unexpected data'},
    };

    const nextState = threadReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });
});
