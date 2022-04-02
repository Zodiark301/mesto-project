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
    this._id = data._id;
    this._likes = data.likes;
    this._userId = data._userId;
    this._owner = data.owner;    
  }

  _setEventLisener () {
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleOpenPopup();
    })
    this._element.querySelector('.elements__like').addEventListener('click', (evt) => {
      this._handlePutLike(evt);
    })
    this._element.querySelector('.elements__remove-button').addEventListener('click', (evt) => {
      this._handleDelete(evt);
    })
  }

  _getElement () {
    const element = cardTemplate.cloneNode(true).content.querySelector('.elements__card');
    return element
  }
  
  _handleOpenPopup () {
    previewTitle.textContent = this._name;
    previewImg.alt = this._name;
    previewImg.src = this._link;
    openPopup(previewPopup);
  }

  _handleDelete (evt) {
   console.log(this);
      API.deleteCard(this._id)
        .then(() => {
          evt.target.closest('.elements__card').remove();
        })
        .catch(err => {
          console.log(err);
        })
  }

  _handlePutLike (evt) {
    const likesNumber = this._element.querySelector('.elements__like-numbers');

    if (evt.target.classList.contains('elements__like_active')) {
      API.deleteLike(this._id)
          .then((res) => { 
            evt.target.classList.remove('elements__like_active');
            likesNumber.textContent = res.likes.length;
          })
          .catch(err => {
            console.log(err);
          })
      } else {     
        API.addLike(this._id)
          .then((res) => {   
            evt.target.classList.add('elements__like_active');
            likesNumber.textContent = res.likes.length;
          })
          .catch(err => {
            console.log(err);
          })
      } 
  }
  
  _generate () {
    this._element = this._getElement();
    this._setEventLisener();

    if (this._likes.some(likedUser => likedUser._id === document.userInfo._id)) {
      this._element.querySelector('.elements__like').classList.add('elements__like_active');
    }
    
    
    if (document.userInfo._id !== this._owner._id) {      
    this._element.querySelector('.elements__remove-button').remove();
  };
  
    const newCardElement = this._element;
    const cardTitleElement = newCardElement.querySelector('.elements__header');
    const cardImageElement = newCardElement.querySelector('.elements__image');
    const deleteButton = newCardElement.querySelector('.elements__remove-button');
    
  
    cardTitleElement.textContent = this._name;
    cardImageElement.alt = this._name;
    cardImageElement.src = this._link;
    newCardElement.dataset.id = this._id;
    this._element.querySelector('.elements__like-numbers').textContent = this._likes.length;
    return this._element
  }
}

function getCard(card) {
 
};

export { cardTemplate, placesList, editProfileButton, newCardButton, getCard };
