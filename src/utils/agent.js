const API_ROOT = 'https://forum-api.dicoding.dev/v1'

class Agent {
  constructor(apiRoot) {
    this.apiRoot = apiRoot;
  }

  setToken(token) {
    localStorage.setItem('accessToken', token);
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  async delete(endpoint) {
    return await this.fetch(`${endpoint}`, 'DELETE');
  }

  async get(endpoint) {
    return await this.fetch(`${endpoint}`, 'GET');
  }

  async put(endpoint, body) {
    return await this.fetch(`${endpoint}`, 'PUT', body);
  }

  async post(endpoint, body) {
    return await this.fetch(`${endpoint}`, 'POST', body);
  }

  async fetch(endpoint, method, body) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.getToken()) {
      headers.Authorization = `Bearer ${this.getToken()}`;
    }

    const options = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.apiRoot}${endpoint}`, options)
    const responseBody = await response.json()
    if (!response.ok) throw Error(responseBody?.message || 'There is problem when communicate to the server')
    return responseBody
  }
}

const request = new Agent(API_ROOT);

const Auth = {
  register: async ({ name, email, password }) =>
    await request.post('/register', { name, email, password }),
  login: async (email, password) =>
    await request.post('/login', { email, password }),
};

const Thread = {
  createThread: async ({ title, category, body }) =>
    await request.post('/threads', { title, category, body }),
  getThreads: async () =>
    await request.get('/threads'),
  getDetailThread: async (threadId) =>
    await request.get(`/threads/${threadId}`),
  commentThread: async (threadId, content) =>
    await request.post(`/threads/${threadId}/comments`, { content }),
  upVoteThread: async (threadId) =>
    await request.post(`/threads/${threadId}/up-vote`),
  downVoteThread: async (threadId) =>
    await request.post(`/threads/${threadId}/down-vote`),
  neutralVoteThread: async (threadId) =>
    await request.post(`/threads/${threadId}/neutral-vote`),
};

const User = {
  getProfile: async () =>
    await request.get('/users/me'),
  getUsers: async () =>
    await request.get('/users'),
}

const Leaderboard = {
  getLeaderboard: async () =>
    await request.get('/leaderboards'),
}

const Comment = {
  upVoteComment: async (threadId, commentId) =>
    await request.post(`/threads/${threadId}/comments/${commentId}/up-vote`),
  downVoteComment: async (threadId, commentId) =>
    await request.post(`/threads/${threadId}/comments/${commentId}/down-vote`),
  neutralVoteComment: async (threadId, commentId) =>
    await request.post(`/threads/${threadId}/comments/${commentId}/neutral-vote`),
}

export default{
  Auth,
  User,
  Thread,
  Comment,
  Leaderboard,
  setToken: _token => request.setToken(_token)
}


