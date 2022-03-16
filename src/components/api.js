const config = {
  url: 'https://nomoreparties.co/v1/plus-cohort7', //ссылка
  headers: {
    authorization: 'ea769cc4-10ce-4fe4-88ef-99f1e88db45d',
    'Content-Type': 'application/json' //тип данных для создания
  }
};

const parseResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Произошла ошибка со статус - кодом ${res.status}`));
};

const gettingProfile = () => {
  return fetch(`${config.url}/users/me`, {
    headers: config.headers,
  })
    .then(res => parseResponse(res))
};

const createProfile = (name, about) => {
  const info = {
    name: name,
    about: about
  }
  return fetch(`${config.url}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(info)
  })
    .then(res => parseResponse(res))
};

const gettingCards = () => {
  return fetch(`${config.url}/cards`, {
    headers: config.headers,
  })
    .then(res => parseResponse(res))
};

const createCards = (name, link) => {
  const infoCards = {
    name: name,
    link: link
  }
  return fetch(`${config.url}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(infoCards)
  })
    .then(res => parseResponse(res))
};

const deleteCard = (id) => {
  return fetch(`${config.url}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => parseResponse(res))
};

const addLike = (id) => {
  return fetch(`${config.url}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(res => parseResponse(res))
};

const deleteLike = (id) => {
  return fetch(`${config.url}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => parseResponse(res))
};

const createAvatar = (image) => {
  const infoAvatar = {
    avatar: image,
  }
  return fetch(`${config.url}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(infoAvatar)
  })
    .then(res => parseResponse(res))
};


export default { parseResponse, gettingProfile, createProfile, gettingCards, createCards, deleteCard, addLike, deleteLike, createAvatar }
