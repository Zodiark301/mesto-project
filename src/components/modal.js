import { closePopup, clearCardForm } from './utils.js';
import { createCard } from './card.js';
import { disableButton, validationConfig } from './validate.js';

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


submitEditProfileForm.addEventListener('submit', function (e) {
  e.preventDefault();
  nameElement.textContent = nameInput.value;
  descriptionElement.textContent = descriptionInput.value;
  closePopup(editProfilePopup);
});

submitNewCardForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const newCardName = newCardNameInput.value;
  const newCardLink = newCardLinkInput.value;
  disableButton(addCardSubmit, validationConfig);
  createCard(newCardName, newCardLink);
  closePopup(newCardPopup);
  clearCardForm();
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
  addCardSubmit
}
