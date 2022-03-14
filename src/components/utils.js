import { newCardNameInput, newCardLinkInput } from './modal.js';

const buttonEscKey = 27;

const handleEscUp = (evt) => {
  if (evt.keyCode === buttonEscKey) {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
};

const handlePopupClose = (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(evt.currentTarget);
  }
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscUp);
  popup.addEventListener('click', handlePopupClose);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscUp);
  popup.removeEventListener('click', handlePopupClose);
}

function clearCardForm() {
  newCardNameInput.value = '';
  newCardLinkInput.value = '';
}

export { openPopup, closePopup, clearCardForm };
