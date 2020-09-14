import { baseAuthURL } from './constants';

class Auth {
  constructor(baseAuthURL) {
    this._baseAuthURL = baseAuthURL;
  }

  register(email, password) {
    return fetch(this._baseAuthURL + '/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        try {
          if(res.ok) {
            return res.json();
          }
        } catch (error) {
          return (error);
        }
      })
        .then(data => {
          return data;
        })
        .catch(error => console.log(error.message));
  }

  authorize(email, password) {
    return fetch(this._baseAuthURL + '/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        try {
          if (res.ok) {
            return res.json();
          }
        } catch (error) {
          return (error);
        }
      })
        .then(data => {
          if (data.token) {
            localStorage.setItem('token', data.token);
            return data;
          }
        })
        .catch(error => console.log(error.message));
  }

  getContent(token) {
    return fetch(this._baseAuthURL + '/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => {
        try {
          if (res.ok) {
            return res.json();
          }
        } catch (error) {
          return (error);
        }
      })
        .then(data => data)
        .catch(error => console.log(error.message));
  }
}

export default new Auth(baseAuthURL);
