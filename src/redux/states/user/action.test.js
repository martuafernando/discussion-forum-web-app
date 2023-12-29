import {vi, describe, it, expect, beforeEach, afterEach} from 'vitest';
import agent from '../../../utils/agent';
import {
  asyncGetProfile,
  asyncLoginUser,
  asyncRegisterUser,
  logoutUser,
} from './action';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {
  SET_PRELOAD,
  SET_USER,
  UNSET_ERROR,
  UNSET_PRELOAD,
  UNSET_USER,
} from '../../actionTypes';
import {setError} from '../error/action';

/**
 * Testing scenario
 *
 * - asyncGetDetailThread
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 * - asyncLoginUser
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 * - asyncRegisterUser
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 * - asyncGetProfile
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 * - logoutUser
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 */

vi.mock('../error/action', () => ({
  setError: vi.fn(),
}));

describe('asyncLoginUser', () => {
  beforeEach(() => {
    agent.Auth._login = agent.Auth.login;
    agent.User._getProfile = agent.User.getProfile;
    agent._setToken = agent.setToken;
  });

  afterEach(() => {
    agent.Auth.login = agent.Auth._login;
    agent.User.getProfile = agent.User._getProfile;
    agent.setToken = agent._setToken;

    // delete backup data
    delete agent.Auth._login;
    delete agent.User._getProfile;
    delete agent._setToken;

    // Reset Mock
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    const dispatch = vi.fn();
    const mockSetToken = vi.fn();
    const fakeLoginResponse = {
      status: 'success',
      message: 'ok',
      data: {
        token: 'token',
      },
    };
    const fakeProfileResponse = {
      status: 'success',
      message: 'ok',
      data: {
        user: {
          id: 'john_doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      },
    };
    agent.Auth.login = () => Promise.resolve(fakeLoginResponse);
    agent.User.getProfile = () => Promise.resolve(fakeProfileResponse);
    agent.setToken = mockSetToken;

    // Action
    await asyncLoginUser('email', 'password')(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(agent.setToken).toHaveBeenCalledWith(fakeLoginResponse.data.token);
    expect(dispatch).toHaveBeenCalledWith({
      type: SET_USER,
      payload: fakeProfileResponse.data.user,
    });
    expect(dispatch).toHaveBeenCalledWith({type: UNSET_ERROR});
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // Arrange
    const dispatch = vi.fn();
    const fakeFailedResponse = {
      status: 'failed',
      message: 'failed message',
    };
    agent.Auth.login = () => Promise.reject(fakeFailedResponse);
    agent.User.getProfile = () => Promise.reject(fakeFailedResponse);
    agent.setToken = () => {};

    // Action
    await asyncLoginUser('email', 'password')(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(setError).toHaveBeenCalledWith({
      type: 'error',
      message: 'failed message',
    });
  });
});

describe('asyncRegisterUser', () => {
  beforeEach(() => {
    agent.Auth._getProfile = agent.Auth.register;
  });

  afterEach(() => {
    agent.Auth.register = agent.Auth._register;

    // delete backup data
    delete agent.Thread._register;

    // Reset Mock
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    const dispatch = vi.fn();
    const fakeLoginResponse = {
      status: 'success',
      message: 'User created',
      data: {
        user: {
          id: 'user-123',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      },
    };
    agent.Auth.register = () => Promise.resolve(fakeLoginResponse);

    // Action
    await asyncRegisterUser('name', 'email', 'password')(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({type: UNSET_ERROR});
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // Arrange
    const dispatch = vi.fn();
    const fakeFailedResponse = {
      status: 'failed',
      message: 'failed message',
    };
    agent.Auth.login = () => Promise.reject(fakeFailedResponse);
    agent.User.getProfile = () => Promise.reject(fakeFailedResponse);
    agent.setToken = () => {};

    // Action
    await asyncLoginUser('email', 'password')(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(setError).toHaveBeenCalledWith({
      type: 'error',
      message: 'failed message',
    });
  });
});

describe('asyncGetProfile', () => {
  beforeEach(() => {
    agent.User._getProfile = agent.User.getProfile;
  });

  afterEach(() => {
    agent.User.getProfile = agent.User._getProfile;

    // delete backup data
    delete agent.Thread._getProfile;

    // Reset Mock
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    const dispatch = vi.fn();
    const fakeResponse = {
      status: 'success',
      message: 'ok',
      data: {
        user: {
          id: 'john_doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      },
    };
    agent.User.getProfile = () => Promise.resolve(fakeResponse);

    // Action
    await asyncGetProfile()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({type: SET_PRELOAD});
    expect(dispatch).toHaveBeenCalledWith({
      type: SET_USER,
      payload: fakeResponse.data.user,
    });
    expect(dispatch).toHaveBeenCalledWith({type: UNSET_ERROR});
    expect(dispatch).toHaveBeenCalledWith({type: UNSET_PRELOAD});
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // Arrange
    const dispatch = vi.fn();
    const fakeFailedResponse = {
      status: 'failed',
      message: 'failed message',
    };
    agent.User.getProfile = () => Promise.reject(fakeFailedResponse);
    agent.setToken = () => {};

    // Action
    await asyncGetProfile()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({type: UNSET_PRELOAD});
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('logoutUser', () => {
  beforeEach(() => {
    agent.Auth._logout = agent.Auth.logout;
  });

  afterEach(() => {
    agent.Auth.logout = agent.Auth._logout;

    // delete backup data
    delete agent.Auth._logout;

    // Reset Mock
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when data fetching success', () => {
    // Arrange
    const dispatch = vi.fn();
    agent.Auth.logout = vi.fn();

    // Action
    logoutUser()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({type: UNSET_USER});
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', () => {
    // Arrange
    const dispatch = vi.fn();
    agent.Auth.logout = () => {
      throw new Error('Logout failed');
    };

    // Action
    logoutUser()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(setError).toHaveBeenCalledWith({
      type: 'error',
      message: 'Logout failed',
    });
  });
});
