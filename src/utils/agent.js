const API_ROOT = 'https://forum-api.dicoding.dev/v1'

class Agent {
  constructor(apiRoot) {
    this.apiRoot = apiRoot;
  }

  setToken(token) {
    this.token = token;
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

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
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
  getThread: async () =>
    await request.get('/threads'),
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

export default{
  Auth,
  User,
  Thread,
  setToken: _token => request.setToken(_token)
}


