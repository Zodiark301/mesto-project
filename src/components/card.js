import { openPopup } from "./utils";

const editProfileButton = document.querySelector('.profile__button_type_edit');
const newCardButton = document.querySelector('.profile__button_type_add');

const previewPopup = document.querySelector('.popup_image');

const previewTitle = previewPopup.querySelector('.popup__caption');
const previewImg = previewPopup.querySelector('.popup__image');

const cardTemplate = document.getElementById('cards');
const placesList = document.querySelector('.elements__list');

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
};

function createCard(name, link) {
  const newCard = getCard(name, link)
  placesList.prepend(newCard);
};


export { createCard, cardTemplate, placesList, editProfileButton, newCardButton };
