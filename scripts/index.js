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
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
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
