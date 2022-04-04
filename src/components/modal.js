import { closePopup, clearCardForm } from '../utils/utils.js';
import Card from './Card.js';
import { cardListSelector} from '../utils/constants.js';
import { disableButton, validationConfig } from './validate.js';
import API from './API.js';

const editProfilePopup = document.querySelector('.popup_profile');
const nameElement = document.querySelector('.profile__name');
const descriptionElement = document.querySelector('.profile__description');
const submitEditProfileForm = editProfilePopup.querySelector('.popup__form');
const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
const descriptionInput = editProfilePopup.querySelector('.popup__input_type_description');

const newCardPopup = document.querySelector('.popup_card');
const submitNewCardForm = newCardPopup.querySelector('.popup__form');
const newCardNameInput = document.querySelector('.popup__input_type_card-name');
const newCardLinkInput = document.querySelector('.popup__input_type_url');
const addCardSubmit = document.querySelector('#add-card-submit');

const changeButtonSubmitProfile = document.querySelector('.popup__button_save_profile');
const changeButtonSubmitCards = document.querySelector('.popup__button_save_cards');

const profileAvatar = document.querySelector('.profile__avatar-button');
const popupAvatar = document.querySelector('.popup_avatar');

const submitAvatarForm = popupAvatar.querySelector('.popup__form');
const changeButtonSubmitAvatar = document.querySelector('.popup__button_save_avatar');
const imageInput = document.querySelector('.popup__input_type_avatar');
const nameProfileImage = document.querySelector('.profile__avatar');

submitEditProfileForm.addEventListener('submit', function (e) {
  e.preventDefault();
  changeButtonSubmitProfile.textContent = 'Сохранение...';
  API.createProfile(nameInput.value, descriptionInput.value)
    .then(data => {
      nameElement.textContent = data.name;
      descriptionElement.textContent = data.about;
      closePopup(editProfilePopup);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      changeButtonSubmitProfile.textContent = 'Сохранить';
    })
});


//---------------------


submitAvatarForm.addEventListener('submit', function (e) {
  e.preventDefault();
  changeButtonSubmitAvatar.textContent = 'Сохранение...';
  API.createAvatar(imageInput.value)
    .then(data => {
      nameProfileImage.src = data.avatar;
      disableButton(changeButtonSubmitAvatar, validationConfig);
      closePopup(popupAvatar);
      clearCardForm();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      changeButtonSubmitAvatar.textContent = 'Сохранить';
    })
});


//---------------------


submitNewCardForm.addEventListener('submit', function (e) {
  e.preventDefault();
  changeButtonSubmitCards.textContent = 'Сохранение...';
  API.createCards(newCardNameInput.value, newCardLinkInput.value)
    .then(res => {
      disableButton(addCardSubmit, validationConfig);
      const car = new Card (res, '.elements__card');     
      document.querySelector(cardListSelector).prepend(card._generate());
      closePopup(newCardPopup);
      clearCardForm();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      changeButtonSubmitCards.textContent = 'Сохранить';
    })

});

export {
  editProfilePopup,
  descriptionElement,
  submitEditProfileForm,
  nameInput,
  descriptionInput,
  nameElement,
  newCardPopup,
  submitNewCardForm,
  newCardNameInput,
  newCardLinkInput,
  addCardSubmit,
  profileAvatar,
  popupAvatar,
  imageInput,
  nameProfileImage
}
