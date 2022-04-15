import '../pages/index.css';
import Card from '../components/Card.js';
import {editProfileButton, newCardButton, cardListSelector} from '../utils/constants.js';
import { enableValidation, validationConfig } from '../components/validate.js';
import { clearCardForm, openPopup } from '../utils/utils.js';
import { editProfilePopup, descriptionElement, nameInput, descriptionInput, nameElement, newCardPopup, profileAvatar, popupAvatar, nameProfileImage } from '../components/modal.js';
import API from '../components/API.js';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';

const api = new API ({
  url:'https://nomoreparties.co/v1/plus-cohort7',
  headers : {
    authorization: 'ea769cc4-10ce-4fe4-88ef-99f1e88db45d',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo('.profile');

editProfileButton.addEventListener('click', function () {
  openPopup(editProfilePopup);
  nameInput.value = nameElement.textContent;
  descriptionInput.value = descriptionElement.textContent;
});

newCardButton.addEventListener('click', function () {
  clearCardForm();
  openPopup(newCardPopup);
});

profileAvatar.addEventListener('click', function () {
  clearCardForm();
  openPopup(popupAvatar);
});

const newCard = new Section ({
  renderer: (item, userId) => {
    const cardToCreate = new Card (item, userId, {
      handleCardClick : (name, link) => {popupWithImage.open(name, link)}
    }, {
      handleLike: (card, id) => {handleLike(card, id, cardToCreate)}
    }, {
      handleDelete: (id) => {
        api.deleteCard(id)
        .catch(err => console.log(err));
      }
    });
    return cardToCreate._generate();
  }
});


Promise.all([api.gettingProfileAPI(), api.gettingCardsAPI()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    userInfo.setUserAvatar(user);
    document.userInfo = user;

    newCard.renderItems(cards, user._id);
  })
  .catch(err => {
    console.log(err);
  });



