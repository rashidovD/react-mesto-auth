import {baseURL, token} from './constants';

class Api {
  constructor(baseURL, token) {
    this._baseURL = baseURL;
    this._token = token;
  }

  _fetchInfo(url, properties) {
    return fetch(this._baseURL + url, properties)
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  getUserInfo() {
    return this._fetchInfo('/users/me', {
      headers: {
        authorization: this._token
      }
    });
  }

  updUserInfo(dataForm) {
    return this._fetchInfo('/users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataForm)
    });
  }

  getInitialCards() {
    return this._fetchInfo('/cards', {
      headers: {
        authorization: this._token
      }
    });
  }

  uploadCard(dataForm) {
    return this._fetchInfo('/cards', {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataForm)
    });
  }

  likeCard(id, liked) {
    let method;
    if (liked) {
      method = 'DELETE';
    } else {
      method = 'PUT';
    }
    return this._fetchInfo('/cards/likes/' + id, {
      method: method,
      headers: {
        authorization: this._token
      }
    });
  }

  deleteCard(id) {
    return this._fetchInfo('/cards/' + id, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    });
  }

  changeAvatar(link) {
    return this._fetchInfo('/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    })
  }
}


export default new Api(baseURL, token);