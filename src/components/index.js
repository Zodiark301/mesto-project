import '../pages/index.css';

import { createCard, editProfileButton, newCardButton } from './card.js';
import { enableValidation, validationConfig } from './validate.js';
import { clearCardForm, openPopup } from './utils.js';
import { editProfilePopup, descriptionElement, nameInput, descriptionInput, nameElement, newCardPopup } from './modal.js';

// Массив стандартных карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

editProfileButton.addEventListener('click', function () {
  openPopup(editProfilePopup);
  nameInput.value = nameElement.textContent;
  descriptionInput.value = descriptionElement.textContent;
});

newCardButton.addEventListener('click', function () {
  clearCardForm();
  openPopup(newCardPopup);
});

initialCards.reverse().forEach((currentData) => {
  createCard(currentData.name, currentData.link);
});

enableValidation(validationConfig);
