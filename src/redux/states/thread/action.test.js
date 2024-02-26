import {vi, describe, it, expect, beforeEach, afterEach} from 'vitest';
import agent from '../../../utils/agent';
import {
  asyncCommentThread,
  asyncDownVoteComment,
  asyncGetDetailThread,
  asyncNeutralVoteComment,
  asyncUpVoteComment,
} from './action';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {
  ADD_COMMENT,
  INCREASE_COMMENT_DISLIKES,
  INCREASE_COMMENT_LIKES,
  NEUTRAL_COMMENT_VOTE,
  SET_THREAD,
} from '../../actionTypes';
import {setMessage} from '../error/action';

/**
 * Testing scenario
 *
 * - asyncGetDetailThread
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 * - asyncCommentThread
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 * - asyncUpVoteComment
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 * - asyncDownVoteComment
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 * - asyncNeutralVoteComment
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 */

vi.mock('../error/action', () => ({
  setMessage: vi.fn(),
}));

describe('asyncGetDetailThread', () => {
  beforeEach(() => {
    agent.Thread._getDetailThread = agent.Thread.getDetailThread;
  });

  afterEach(() => {
    agent.Thread.getDetailThread = agent.Thread._getDetailThread;

    // delete backup data
    delete agent.Thread._getDetailThread;

    // Reset Mock
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    const dispatch = vi.fn();
    const fakeThreadResponse = {
      status: 'success',
      message: 'ok',
      data: {
        detailThread: {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
          comments: [
            {
              id: 'comment-1',
              content: 'Ini adalah komentar pertama',
              createdAt: '2021-06-21T07:00:00.000Z',
              owner: {
                id: 'users-1',
                name: 'John Doe',
                avatar: 'https://generated-image-url.jpg',
              },
              upVotesBy: [],
              downVotesBy: [],
            },
          ],
        },
      },
    };
    agent.Thread.getDetailThread = () => Promise.resolve(fakeThreadResponse);

    // Action
    await asyncGetDetailThread()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: SET_THREAD,
      payload: {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
        comments: [
          {
            id: 'comment-1',
            content: 'Ini adalah komentar pertama',
            createdAt: '2021-06-21T07:00:00.000Z',
            owner: {
              id: 'users-1',
              name: 'John Doe',
              avatar: 'https://generated-image-url.jpg',
            },
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      },
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // Arrange
    const dispatch = vi.fn();
    const fakeThreadResponse = {
      status: 'failed',
      message: 'failed message',
    };
    agent.Thread.getDetailThread = () => Promise.reject(fakeThreadResponse);

    // Action
    await asyncGetDetailThread()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(setMessage).toHaveBeenCalledWith({
      type: 'error',
      message: 'failed message',
    });
  });
});

describe('asyncCommentThread', () => {
  beforeEach(() => {
    agent.Thread._commentThread = agent.Thread.commentThread;
  });

  afterEach(() => {
    agent.Thread.commentThread = agent.Thread._commentThread;

    // delete backup data
    delete agent.Thread._commentThread;

    // Reset Mock
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    const dispatch = vi.fn();
    const fakeResponse = {
      status: 'success',
      message: 'Comment created',
      data: {
        comment: {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com',
          },
        },
      },
    };
    agent.Thread.commentThread = () => Promise.resolve(fakeResponse);

    // Action
    await asyncCommentThread()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: ADD_COMMENT,
      payload: fakeResponse.data.comment,
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // Arrange
    const dispatch = vi.fn();
    const fakeResponse = {
      status: 'error',
      message: 'failed message',
    };
    agent.Thread.commentThread = () => Promise.reject(fakeResponse);

    // Action
    await asyncCommentThread()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(setMessage).toHaveBeenCalledWith({
      type: 'error',
      message: fakeResponse.message,
    });
  });
});

describe('asyncUpVoteComment', () => {
  beforeEach(() => {
    agent.Comment._upVoteComment = agent.Comment.upVoteComment;
  });

  afterEach(() => {
    agent.Comment.upVoteComment = agent.Comment._upVoteComment;

    // delete backup data
    delete agent.Comment._upVoteComment;

    // Reset Mock
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    const dispatch = vi.fn();
    const fakeResponse = {
      status: 'success',
      message: 'Thread upvoted',
      data: {
        vote: {
          id: 'vote-1',
          userId: 'users-1',
          threadId: 'thread-1',
          voteType: 1,
        },
      },
    };
    agent.Comment.upVoteComment = () => Promise.resolve(fakeResponse);

    // Action
    await asyncUpVoteComment('threadId', 'commentId', 'userId')(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: INCREASE_COMMENT_LIKES,
      payload: {
        threadId: 'threadId',
        commentId: 'commentId',
        userId: 'userId',
      },
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // Arrange
    const dispatch = vi.fn();
    const fakeResponse = {
      status: 'error',
      message: 'failed message',
    };
    agent.Comment.upVoteComment = () => Promise.reject(fakeResponse);

    // Action
    await asyncUpVoteComment('threadId', 'commentId', 'userId')(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: NEUTRAL_COMMENT_VOTE,
      payload: {
        threadId: 'threadId',
        commentId: 'commentId',
        userId: 'userId',
      },
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(setMessage).toHaveBeenCalledWith({
      type: 'error',
      message: fakeResponse.message,
    });
  });
});

describe('asyncDownVoteComment', () => {
  beforeEach(() => {
    agent.Comment._downVoteComment = agent.Comment.downVoteComment;
  });

  afterEach(() => {
    agent.Comment.downVoteComment = agent.Comment._downVoteComment;

    // delete backup data
    delete agent.Comment._downVoteComment;

    // Reset Mock
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    const dispatch = vi.fn();
    const fakeResponse = {
      status: 'success',
      message: 'Thread downvoted',
      data: {
        vote: {
          id: 'vote-1',
          userId: 'users-1',
          threadId: 'thread-1',
          voteType: -1,
        },
      },
    };
    agent.Comment.downVoteComment = () => Promise.resolve(fakeResponse);

    // Action
    await asyncDownVoteComment('threadId', 'commentId', 'userId')(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: INCREASE_COMMENT_DISLIKES,
      payload: {
        threadId: 'threadId',
        commentId: 'commentId',
        userId: 'userId',
      },
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // Arrange
    const dispatch = vi.fn();
    const fakeResponse = {
      status: 'error',
      message: 'failed message',
    };
    agent.Comment.downVoteComment = () => Promise.reject(fakeResponse);

    // Action
    await asyncDownVoteComment('threadId', 'commentId', 'userId')(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: NEUTRAL_COMMENT_VOTE,
      payload: {
        threadId: 'threadId',
        commentId: 'commentId',
        userId: 'userId',
      },
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(setMessage).toHaveBeenCalledWith({
      type: 'error',
      message: fakeResponse.message,
    });
  });
});

describe('asyncNeutralVoteComment', () => {
  beforeEach(() => {
    agent.Comment._neutralVoteComment = agent.Comment.neutralVoteComment;
  });

  afterEach(() => {
    agent.Comment.neutralVoteComment = agent.Comment._neutralVoteComment;

    // delete backup data
    delete agent.Comment._neutralVoteComment;

    // Reset Mock
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    const dispatch = vi.fn();
    const fakeResponse = {
      status: 'success',
      message: 'Thread vote neutralized',
      data: {
        vote: {
          id: 'vote-1',
          userId: 'users-1',
          threadId: 'thread-1',
          voteType: 0,
        },
      },
    };
    agent.Comment.neutralVoteComment = () => Promise.resolve(fakeResponse);

    // Action
    await asyncNeutralVoteComment('threadId', 'commentId', 'userId')(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: NEUTRAL_COMMENT_VOTE,
      payload: {
        threadId: 'threadId',
        commentId: 'commentId',
        userId: 'userId',
      },
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // Arrange
    const dispatch = vi.fn();
    const fakeResponse = {
      status: 'error',
      message: 'failed message',
    };
    agent.Comment.neutralVoteComment = () => Promise.reject(fakeResponse);

    // Action
    await asyncNeutralVoteComment('threadId', 'commentId', 'userId')(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(setMessage).toHaveBeenCalledWith({
      type: 'error',
      message: fakeResponse.message,
    });
  });
});
