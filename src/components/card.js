import { openPopup } from "./utils";
import API from './api.js';

const editProfileButton = document.querySelector('.profile__button_type_edit');
const newCardButton = document.querySelector('.profile__button_type_add');

const previewPopup = document.querySelector('.popup_image');

const previewTitle = previewPopup.querySelector('.popup__caption');
const previewImg = previewPopup.querySelector('.popup__image');

const cardTemplate = document.getElementById('cards');
const placesList = document.querySelector('.elements__list');


export class Card {
  constructor (data) {
    this._name = data.name;
    this._link = data.link;
    this._id = data.id;
    this._likes = data.likes;
    this._userId = data.userId;
    this._owner = data.owner;
  }
  _setEventLisener () {
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleOpenPopup();
    })
  }

  _generate () {

    this._element = this._getElement();  
    this._setEventLisener();

    const newCardElement = this._element;
    const cardTitleElement = newCardElement.querySelector('.elements__header');
    const cardImageElement = newCardElement.querySelector('.elements__image');
    const deleteButton = newCardElement.querySelector('.elements__remove-button');
    const cardLike = newCardElement.querySelector('.elements__like');
    const likesNumber = newCardElement.querySelector('.elements__like-numbers');

    cardTitleElement.textContent = this._name;
    cardImageElement.alt = this._name;
    cardImageElement.src = this._link;
    newCardElement.dataset.id = this._id;
    likesNumber.textContent = this.length;
    return this._element
  }

  _handleOpenPopup () {
    previewTitle.textContent = this._name;
    previewImg.alt = this._name;
    previewImg.src = this._link;
    openPopup(previewPopup);
  }

  _getElement () {
    const element = cardTemplate.cloneNode(true).content.querySelector('.elements__card');
    return element
  }
}

function getCard(card) {
  

  // if (likes.some(likedUser => likedUser._id === userId)) {
  //   cardLike.classList.add('elements__like_active');
  // }

  // if (userId !== owner._id) {
  //   deleteButton.remove();
  // };




  // cardLike.addEventListener('click', addNewLikeCard)
  // function addNewLikeCard(evt) {
  //   if (evt.target.classList.contains('elements__like_active')) {
  //     API.deleteLike(newCardElement.dataset.id)
  //       .then((res) => {
  //         evt.target.classList.remove('elements__like_active');
  //         likesNumber.textContent = res.likes.length;
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       })
  //   } else {
  //     API.addLike(newCardElement.dataset.id)
  //       .then((res) => {
  //         evt.target.classList.add('elements__like_active');
  //         likesNumber.textContent = res.likes.length;
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       })
  //   }
  // };

  // deleteButton.addEventListener('click', deleteButtonCards)
  // function deleteButtonCards(evt) {
  //   API.deleteCard(evt.target.closest('.elements__card').dataset.id)
  //     .then(() => {
  //       evt.target.closest('.elements__card').remove();
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // };

  return newCardElement
};

export { cardTemplate, placesList, editProfileButton, newCardButton, getCard };
