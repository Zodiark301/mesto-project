import './pages/index.css';

const buttonEscKey = 27;

const handleEscUp = (evt) => {
  if (evt.keyCode === buttonEscKey) {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
};

const handleClickOverlay = (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
};

//----------------Валидация---------------------//

const validationConfig = {
  formSelector: '.popup__form', // Ищем по классу все формы
  inputSelector: '.popup__input', // Ищем все поля по классу
  inputInvalidClass: 'popup__input_invalid',
  errorClass: 'popup__error_visible',
  buttonSelector: '.popup__button',
  buttonDisabledClass: 'popup__button_disabled',
};

const showInputError = (inputElement, errorElement, errorMessage, config) => {
  inputElement.classList.add(config.inputInvalidClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (inputElement, errorElement, config) => {
  inputElement.classList.remove(config.inputInvalidClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const checkinputValidity = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);

  if (inputElement.validity.valid) {
    hideInputError(inputElement, errorElement, config)
  } else {
    showInputError(inputElement, errorElement, inputElement.validationMessage, config);
  }
};

// Функция добавления класса кнопки и выключения кнопки для нажатия
const disableButton = (buttonElement, config) => {
  buttonElement.classList.add(config.buttonDisabledClass);
  buttonElement.disabled = true;
};

// Функция удаления класса кнопки включения кнопки для нажатия
const enableButton = (buttonElement, config) => {
  buttonElement.classList.remove(config.buttonDisabledClass);
  buttonElement.disabled = false;
};

// Проверка всех полей формы на правильность заполнения
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (formElement, inputList, config) => {
  const buttonElement = formElement.querySelector(config.buttonSelector);

  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, config);
  } else {
    enableButton(buttonElement, config);
  }
};

const setEventListener = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkinputValidity(formElement, inputElement, config);
      toggleButtonState(formElement, inputList, config);
      console.log('here2');
    });
  });

  toggleButtonState(formElement, inputList, config);
};
// Ищем все формы по классу
const enableValidation = (config) => { // Делаем функцию принимающую найденные поля в форме из объекта validationConfig
  const forms = Array.from(document.querySelectorAll(config.formSelector)) // Помещаем все в переменную и ищем все формы в документе по классу
  // помощью Array.from делаем из псевдомассива обычный массив для дальнейшего удобного использования

  forms.forEach(formElement => { // Проходимся по массиву полей и отменяем для них стандартное поведение отправки формы
    formElement.addEventListener('submit', event => { // Добавляем слушатель на кнопку отправки
      event.preventDefault(); // Отменяем стандартное поведение кнопки отправки
    });
    setEventListener(formElement, config);
  });
};

enableValidation(validationConfig); // Вызываем функцию отменяющую стандартное поведение кнопки отправки и передаем ей все найденные поля из объекта validationConfig

//----------------Валидация---------------------//

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

const editProfilePopup = document.querySelector('.popup_profile');
const newCardPopup = document.querySelector('.popup_card');
const previewPopup = document.querySelector('.popup_image');

const previewTitle = previewPopup.querySelector('.popup__caption');
const previewImg = previewPopup.querySelector('.popup__image');

const closeProfilePopupButton = editProfilePopup.querySelector('.popup__close');
const closeNewCardPopupButton = newCardPopup.querySelector('.popup__close');

const submitNewCardForm = newCardPopup.querySelector('.popup__form');
const newCardNameInput = document.querySelector('.popup__input_type_card-name');
const newCardLinkInput = document.querySelector('.popup__input_type_url');

const editProfileButton = document.querySelector('.profile__button_type_edit');
const newCardButton = document.querySelector('.profile__button_type_add');

const nameElement = document.querySelector('.profile__name');
const descriptionElement = document.querySelector('.profile__description');
const submitEditProfileForm = editProfilePopup.querySelector('.popup__form')
const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
const descriptionInput = editProfilePopup.querySelector('.popup__input_type_description');
const closePreviewButton = previewPopup.querySelector('.popup__close');

const cardTemplate = document.getElementById('cards');
const placesList = document.querySelector('.elements__list');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscUp);
  popup.addEventListener('click', handleClickOverlay);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscUp);
  popup.removeEventListener('click', handleClickOverlay);
}

editProfileButton.addEventListener('click', function () {
  openPopup(editProfilePopup);
  nameInput.value = nameElement.textContent;
  descriptionInput.value = descriptionElement.textContent;
});

closeProfilePopupButton.addEventListener('click', function () {
  closePopup(editProfilePopup);
});

submitEditProfileForm.addEventListener('submit', function (e) {
  e.preventDefault();
  nameElement.textContent = nameInput.value;
  descriptionElement.textContent = descriptionInput.value;
  closePopup(editProfilePopup);
})

newCardButton.addEventListener('click', function () {
  openPopup(newCardPopup);
});

closeNewCardPopupButton.addEventListener('click', function () {
  closePopup(newCardPopup);
});

closePreviewButton.addEventListener('click', function () {
  closePopup(previewPopup);
})

initialCards.reverse().forEach((currentData) => {
  createCard(currentData.name, currentData.link);
});

function getCard(name, link) {
  const newCardElement = cardTemplate.cloneNode(true).content.querySelector('.elements__card');
  const cardTitleElement = newCardElement.querySelector('.elements__header');
  const cardImageElement = newCardElement.querySelector('.elements__image');
  const deleteButton = newCardElement.querySelector('.elements__remove-button');
  const cardLike = newCardElement.querySelector('.elements__like');

  cardTitleElement.textContent = name;
  cardImageElement.alt = name;
  cardImageElement.src = link;

  cardImageElement.addEventListener('click', function () {
    previewTitle.textContent = name;
    previewImg.alt = name;
    previewImg.src = link;
    openPopup(previewPopup);
  })

  cardLike.addEventListener('click', function (e) {
    e.target.classList.toggle('elements__like_active');
  });

  deleteButton.addEventListener('click', function (e) {
    newCardElement.remove();
  })

  return newCardElement
}

function createCard(name, link) {
  const newCard = getCard(name, link)
  placesList.prepend(newCard);
}

submitNewCardForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const newCardName = newCardNameInput.value;
  const newCardLink = newCardLinkInput.value;
  createCard(newCardName, newCardLink);
  closePopup(newCardPopup);
  clearCardForm();
})

function clearCardForm() {
  newCardNameInput.value = "";
  newCardLinkInput.value = "";
}
