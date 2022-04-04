

export default class API {
  constructor (config) {
    this._config = config;
  }
  _parseResponse (res)  {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Произошла ошибка со статус - кодом ${res.status}`));
  };

  gettingProfile  () {
    return fetch(`${this._config.url}/users/me`, {
      headers: this._config.headers,
    })
      .then(res => this._parseResponse(res))
  };

  createProfile  (name, about)  {
    const info = {
      name: name,
      about: about
    }
    return fetch(`${this._config.url}/users/me`, {
      method: 'PATCH',
      headers: this._config.headers,
      body: JSON.stringify(info)
    })
    .then(res => this._parseResponse(res))
  };

  gettingCards () {
    return fetch(`${this._config.url}/cards`, {
      headers: this._config.headers,
    })
    .then(res => this._parseResponse(res))
  }
  createCards  (name, link) {
    const infoCards = {
      name: name,
      link: link
    }
    return fetch(`${this._config.url}/cards`, {
      method: 'POST',
      headers: this._config.headers,
      body: JSON.stringify(infoCards)
    })
    .then(res => this._parseResponse(res))
  };

 deleteCard  (id) {
    return fetch(`${this._config.url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._config.headers,
    })
    .then(res => this._parseResponse(res))
  };
  addLike (id) {
    return fetch(`${this._config.url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._config.headers,
    })
    .then(res => this._parseResponse(res))
  };

  createAvatar  (image) {
    const infoAvatar = {
      avatar: image,
    }
    return fetch(`${this._config.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._config.headers,
      body: JSON.stringify(infoAvatar)
    })
    .then(res => this._parseResponse(res))
  };
}


