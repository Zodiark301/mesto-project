import { cardTemplate } from "../utils/constants.js";

export default class Card {
  constructor(data, userId, { handleCardClick }, { handleLike }, { handleDelete }, selector) {
    this._selector = selector;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._userId = userId;
    this._owner = data.owner;
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._handleDelete = handleDelete;
  }

  _setEventLisener() {
    this._cardImageElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
    this._cardLikeEl.addEventListener('click', () => {
      this._handleLike(this._element, this._id);
    })
    this._cardDeleteEl.addEventListener('click', () => {
      this._handleDelete(this._id);
    })
  }
  _checkLike() {
    if (this._likes.some(likedUser => likedUser._id === this._userId)) {
      this._cardLikeEl.classList.add('elements__like_active');
      this._element.dataset.isLiked = 'true';
    } else {
      this._element.dataset.isLiked = 'false';
    }
  }

  deleteLike(res) {
    this._cardLikeEl.classList.remove('elements__like_active');
    this._cardLikeNumberEl.textContent = res.likes.length;
    this._element.dataset.isLiked = 'false';
  }
  putLike(res) {
    this._cardLikeEl.classList.add('elements__like_active');
    this._cardLikeNumberEl.textContent = res.likes.length;
    this._element.dataset.isLiked = 'true';
  }

  _getElement() {
    return cardTemplate.cloneNode(true).content.querySelector('.elements__card');
  }

  _generate() {
    this._element = this._getElement();
    this._cardImageElement = this._element.querySelector('.elements__image');
    this._cardLikeEl = this._element.querySelector('.elements__like');
    this._cardLikeNumberEl = this._element.querySelector('.elements__like-numbers');
    this._cardDeleteEl = this._element.querySelector('.elements__remove-button');

    this._setEventLisener();
    this._checkLike();

    if (this._userId !== this._owner._id) {
      this._element.querySelector('.elements__remove-button').remove();
    };
    const newCardElement = this._element;
    const cardTitleElement = newCardElement.querySelector('.elements__header');

    cardTitleElement.textContent = this._name;
    this._cardImageElement.alt = this._name;
    this._cardImageElement.src = this._link;
    newCardElement.dataset.id = this._id;
    this._element.querySelector('.elements__like-numbers').textContent = this._likes.length;
    return this._element
  }
}
