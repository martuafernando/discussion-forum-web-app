import {vi, describe, it, expect, beforeEach, afterEach} from 'vitest';
import agent from '../../../utils/agent';
import {
  asyncCreateThread,
  asyncDownVoteThread,
  asyncGetThread,
  asyncNeutralVoteThread,
  asyncUpVoteThread,
} from './action';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {
  ADD_THREAD,
  INCREASE_THREAD_DISLIKES,
  INCREASE_THREAD_LIKES,
  NEUTRAL_THREAD_VOTE,
  SET_THREADS,
} from '../../actionTypes';
import {setMessage} from '../error/action';

/**
 * Testing scenario
 *
 * - asyncCreateThread
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 * - asyncGetThread
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 * - asyncUpVoteThread
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 * - asyncDownVoteThread
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 * - asyncNeutralVoteThread
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 */

vi.mock('../error/action', () => ({
  setMessage: vi.fn(),
}));

describe('asyncCreateThread', () => {
  beforeEach(() => {
    agent.Thread._createThread = agent.Thread.createThread;
  });

  afterEach(() => {
    agent.Thread.createThread = agent.Thread._createThread;

    // delete backup data
    delete agent.Thread._createThread;

    // Reset Mock
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    const dispatch = vi.fn();
    const mockFunction = vi.fn();
    const user = {
      id: 'users-1',
      name: 'John Doe',
      avatar: 'https://generated-image-url.jpg',
    };
    const fakeResponse = {
      status: 'success',
      message: 'Thread created',
      data: {
        thread: {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-1',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };
    agent.Thread.createThread = () => Promise.resolve(fakeResponse);

    // Action
    await asyncCreateThread({
      title: 'Thread Pertama',
      category: 'General',
      body: 'Ini adalah thread pertama',
      user,
      onSuccessCallback: mockFunction,
    })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: ADD_THREAD,
      payload: {
        ...fakeResponse.data.thread,
        owner: user,
      },
    });
    expect(mockFunction).toBeCalled();
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // Arrange
    const dispatch = vi.fn();
    const user = {
      id: 'users-1',
      name: 'John Doe',
      avatar: 'https://generated-image-url.jpg',
    };
    const fakeThreadResponse = {
      status: 'failed',
      message: 'failed message',
    };
    agent.Thread.createThread = () => Promise.reject(fakeThreadResponse);

    // Action
    await asyncCreateThread({
      title: 'Thread Pertama',
      category: 'General',
      body: 'Ini adalah thread pertama',
      user,
      onSuccessCallback: () => {},
    })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(setMessage).toHaveBeenCalledWith({
      type: 'error',
      message: 'failed message',
    });
  });
});

describe('asyncGetThread', () => {
  beforeEach(() => {
    agent.Thread._getThreads = agent.Thread.getThreads;
    agent.Thread._getUsers = agent.Thread.getUsers;
  });

  afterEach(() => {
    agent.Thread.getThreads = agent.Thread._getThreads;
    agent.Thread.getUsers = agent.Thread._getUsers;

    // delete backup data
    delete agent.Thread._getThreads;
    delete agent.Thread._getUsers;

    // Reset Mock
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    const dispatch = vi.fn();
    const fakeThreadsResponse = {
      status: 'success',
      message: 'ok',
      data: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
          {
            id: 'thread-2',
            title: 'Thread Kedua',
            body: 'Ini adalah thread kedua',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-2',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };
    const fakeUsersResponse = {
      status: 'success',
      message: 'ok',
      data: {
        users: [
          {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
          {
            id: 'users-2',
            name: 'Jane Doe',
            email: 'jane@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
        ],
      },
    };
    agent.Thread.getThreads = () => Promise.resolve(fakeThreadsResponse);
    agent.User.getUsers = () => Promise.resolve(fakeUsersResponse);

    // Action
    await asyncGetThread()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: SET_THREADS,
      payload: [
        {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-1',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
          owner: {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
        },
        {
          id: 'thread-2',
          title: 'Thread Kedua',
          body: 'Ini adalah thread kedua',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-2',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
          owner: {
            id: 'users-2',
            name: 'Jane Doe',
            email: 'jane@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
        },
      ],
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // Arrange
    const dispatch = vi.fn();
    const fakeResponse = {
      status: 'failed',
      message: 'failed message',
    };
    agent.Thread.getThreads = () => Promise.reject(fakeResponse);
    agent.Thread.getUsers = () => Promise.reject(fakeResponse);

    // Action
    await asyncGetThread()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(setMessage).toHaveBeenCalledWith({
      type: 'error',
      message: 'failed message',
    });
  });
});

describe('asyncUpVoteThread', () => {
  beforeEach(() => {
    agent.Thread._upVoteThread = agent.Thread.upVoteThread;
  });

  afterEach(() => {
    agent.Thread.upVoteThread = agent.Thread._upVoteThread;

    // delete backup data
    delete agent.Thread._upVoteThread;

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
    agent.Thread.upVoteThread = () => Promise.resolve(fakeResponse);

    // Action
    await asyncUpVoteThread('threadId', 'userId')(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: INCREASE_THREAD_LIKES,
      payload: {
        threadId: 'threadId',
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
    agent.Thread.upVoteThread = () => Promise.reject(fakeResponse);

    // Action
    await asyncUpVoteThread('threadId', 'userId')(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith({
      type: INCREASE_THREAD_LIKES,
      payload: {
        threadId: 'threadId',
        userId: 'userId',
      },
    });
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: NEUTRAL_THREAD_VOTE,
      payload: {
        threadId: 'threadId',
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

describe('asyncDownVoteThread', () => {
  beforeEach(() => {
    agent.Thread._downVoteThread = agent.Thread.downVoteThread;
  });

  afterEach(() => {
    agent.Thread.downVoteThread = agent.Thread._downVoteThread;

    // delete backup data
    delete agent.Thread._downVoteThread;

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
    agent.Thread.downVoteThread = () => Promise.resolve(fakeResponse);

    // Action
    await asyncDownVoteThread('threadId', 'userId')(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: INCREASE_THREAD_DISLIKES,
      payload: {
        threadId: 'threadId',
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
    agent.Thread.downVoteThread = () => Promise.reject(fakeResponse);

    // Action
    await asyncDownVoteThread('threadId', 'userId')(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith({
      type: INCREASE_THREAD_DISLIKES,
      payload: {
        threadId: 'threadId',
        userId: 'userId',
      },
    });
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: NEUTRAL_THREAD_VOTE,
      payload: {
        threadId: 'threadId',
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

describe('asyncNeutralVoteThread', () => {
  beforeEach(() => {
    agent.Thread._neutralVoteThread = agent.Thread.neutralVoteThread;
  });

  afterEach(() => {
    agent.Thread.neutralVoteThread = agent.Thread._neutralVoteThread;

    // delete backup data
    delete agent.Thread._neutralVoteThread;

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
    agent.Thread.neutralVoteThread = () => Promise.resolve(fakeResponse);

    // Action
    await asyncNeutralVoteThread('threadId', 'userId')(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: NEUTRAL_THREAD_VOTE,
      payload: {
        threadId: 'threadId',
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
    agent.Thread.neutralVoteThread = () => Promise.reject(fakeResponse);

    // Action
    await asyncNeutralVoteThread('threadId', 'userId')(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith({
      type: NEUTRAL_THREAD_VOTE,
      payload: {
        threadId: 'threadId',
        userId: 'userId',
      },
    });
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(setMessage).toHaveBeenCalledWith({
      type: 'error',
      message: fakeResponse.message,
    });
  });
});
