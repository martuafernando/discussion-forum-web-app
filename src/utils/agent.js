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

const User = {
  getProfile: async () =>
    await request.get('/users/me'),
}

export default{
  Auth,
  User,
  setToken: _token => request.setToken(_token)
}


