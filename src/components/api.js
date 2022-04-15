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

  gettingProfileAPI  () {
    return fetch(`${this._config.url}/users/me`, {
      headers: this._config.headers
    })
      .then(res => this._parseResponse(res))
  };

  gettingCardsAPI () {
    return fetch (`${this._config.url}/cards`, {
      headers: this._config.headers
    })
    .then (res=> this._parseResponse(res))
  };

  createProfileAPI  (name, about)  {
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

  createCardAPI  (data) {    
    return fetch(`${this._config.url}/cards`, {
      method: 'POST',
      headers: this._config.headers,
      body: JSON.stringify(data)
    })
    .then(res => this._parseResponse(res))
  };

 deleteCardAPI  (id) {
    return fetch(`${this._config.url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._config.headers,
    })
    .then(res => this._parseResponse(res))
  };

  deleteLikeAPI  (id) {
    return fetch(`${this._config.url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._config.headers,
    })
    .then(res => this._parseResponse(res))
  };

  putLikeAPI  (id) {
    return fetch(`${this._config.url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._config.headers,
    })
    .then(res => this._parseResponse(res))
  };

   changeAvatarAPI ({avatar}) {
    return fetch(`${config.urlProfile}/avatar` , {
      method: 'PATCH',
      headers: {
        authorization: config.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: `${avatar}`
      })
    })
    .then (res => parseResponse (res));
  }

  changeProfileAPI  (data)  {
    return fetch(`${this._config.url}/users/me`, {
      method: 'PATCH',
      headers: this._config.headers,
      body: JSON.stringify(data)
    })
    .then(res => this._parseResponse(res))
  };

  createAvatarAPI  (image) {
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