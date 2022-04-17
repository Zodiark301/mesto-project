export const editProfileButton = document.querySelector('.profile__button_type_edit');
export const newCardButton = document.querySelector('.profile__button_type_add');
export const previewPopup = document.querySelector('.popup_image');
export const previewTitle = previewPopup.querySelector('.popup__caption');
export const previewImg = previewPopup.querySelector('.popup__image');
export const cardTemplate = document.getElementById('cards');
export const cardListSelector = '.elements__list';
export const avatarButton = document.querySelector('.profile__avatar-button');

export const validationConfig = {
  formSelector: '.popup__form', // Ищем по классу все формы
  inputSelector: '.popup__input', // Ищем все поля по классу
  inputInvalidClass: 'popup__input_invalid',
  errorClass: 'popup__error_visible',
  buttonSelector: '.popup__button',
  buttonDisabledClass: 'popup__button_disabled',
};