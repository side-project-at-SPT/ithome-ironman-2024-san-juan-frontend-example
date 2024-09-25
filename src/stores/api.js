class Api {
  constructor() {
    this._token = null;
    this._apiHost = 'http://localhost:3000';
  }

  get token() {
    return this._token;
  }

  setEnvironment(env) {
    switch (env) {
      case 'production':
        this._apiHost = 'https://ithome-ironman-2024-san-juan.zeabur.app';
        break;
      case 'development':
      default:
        this._apiHost = 'http://localhost:3000';
        break;
    }
  }

  async visitorLogin() {
    if (this._token) {
      console.log('you have already logged in');
      return;
    }

    const oldToken = localStorage.getItem('token');
    if (oldToken) {
      if (
        confirm(`You have already logged at ${localStorage.getItem('last_visited_at')}
      Do you want to use previous account?`)
      ) {
        this._token = oldToken;
        localStorage.setItem('last_visited_at', new Date().toLocaleString());
        console.log('login success, welcome back');
        return;
      }

      localStorage.removeItem('token');
      localStorage.removeItem('visitor');
      localStorage.removeItem('last_visited_at');
    }

    const response = await fetch(`${this._apiHost}/api/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { token } = await response.json();
    localStorage.setItem('token', token);
    localStorage.setItem('visitor', true);
    localStorage.setItem('last_visited_at', new Date().toLocaleString());
    this._token = token;
    console.log('visitor login success');
  }

  async showRooms() {
    const response = await fetch(`${this._apiHost}/api/v1/rooms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}`
      }
    });
    const { rooms } = await response.json();
    return rooms;
  }
}

// use Singleton pattern
const api = new Api();

export default api;
