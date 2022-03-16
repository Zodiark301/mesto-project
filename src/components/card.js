import { openPopup } from "./utils";
import API from './api.js';

const editProfileButton = document.querySelector('.profile__button_type_edit');
const newCardButton = document.querySelector('.profile__button_type_add');

const previewPopup = document.querySelector('.popup_image');

const previewTitle = previewPopup.querySelector('.popup__caption');
const previewImg = previewPopup.querySelector('.popup__image');

const cardTemplate = document.getElementById('cards');
const placesList = document.querySelector('.elements__list');



function getCard(name, link, id, likes, userId, owner) {
  const newCardElement = cardTemplate.cloneNode(true).content.querySelector('.elements__card');
  const cardTitleElement = newCardElement.querySelector('.elements__header');
  const cardImageElement = newCardElement.querySelector('.elements__image');
  const deleteButton = newCardElement.querySelector('.elements__remove-button');
  const cardLike = newCardElement.querySelector('.elements__like');
  const likesNumber = newCardElement.querySelector('.elements__like-numbers');

  if (likes.some(likedUser => likedUser._id === userId)) {
    cardLike.classList.add('elements__like_active');
  }

  if (userId !== owner._id) {
    deleteButton.remove();
  };

  cardTitleElement.textContent = name;
  cardImageElement.alt = name;
  cardImageElement.src = link;
  newCardElement.dataset.id = id;
  likesNumber.textContent = likes.length;

  cardImageElement.addEventListener('click', function () {
    previewTitle.textContent = name;
    previewImg.alt = name;
    previewImg.src = link;
    openPopup(previewPopup);
  })

  cardLike.addEventListener('click', addNewLikeCard)
  function addNewLikeCard(evt) {
    if (evt.target.classList.contains('elements__like_active')) {
      API.deleteLike(newCardElement.dataset.id)
        .then((res) => {
          evt.target.classList.remove('elements__like_active');
          likesNumber.textContent = res.likes.length;
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      API.addLike(newCardElement.dataset.id)
        .then((res) => {
          evt.target.classList.add('elements__like_active');
          likesNumber.textContent = res.likes.length;
        })
        .catch(err => {
          console.log(err);
        })
    }
  };

  deleteButton.addEventListener('click', deleteButtonCards)
  function deleteButtonCards(evt) {
    API.deleteCard(evt.target.closest('.elements__card').dataset.id)
      .then(() => {
        evt.target.closest('.elements__card').remove();
      })
      .catch(err => {
        console.log(err);
      })
  };

  return newCardElement
};

export { cardTemplate, placesList, editProfileButton, newCardButton, getCard };
