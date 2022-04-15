import '../pages/index.css';

import Card from '../components/Card.js';
import {editProfileButton, newCardButton, cardListSelector} from '../utils/constants.js';
import {validationConfig } from '../components/validate.js';
import { descriptionElement, descriptionInput} from '../components/modal.js';
import API from '../components/API.js';
import Section from '../components/Section';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/userInfo';
import FormValidator from '../components/FormValidator';

const api = new API({
  url: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: 'ea769cc4-10ce-4fe4-88ef-99f1e88db45d',
    'Content-Type': 'application/json'
  }
});

const formAvatarValidity = new FormValidator (validationConfig, '.popup_avatar');
const formProfileValidity = new FormValidator(validationConfig, '.popup_profile');
const formCardValidity = new FormValidator (validationConfig, '.popup_card');
const formsToValidate = [formAvatarValidity, formProfileValidity, formCardValidity];
formsToValidate.forEach((form) => {
  form.enableValidation();
})

const userInfo = new UserInfo('.profile');

const popupWithImage = new PopupWithImage('.popup_image');
popupWithImage.setEventListeners();

const popupWithAvatar = new PopupWithForm('.popup_avatar', {
  handleSubmit: (data) => {
    popupWithAvatar.setSubmitButtonText('Сохранение...');
    api.createAvatarAPI(data.link)
      .then((data) => {
        userInfo.setUserAvatar(data);
        popupWithAvatar.close();
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupWithAvatar.setSubmitButtonText('Сохранить');
      })
  }
}, {
  resetValidation: (input) => {
    resetValidation(input, formAvatarValidity, document.querySelector('.popup_avatar'));
  }
})
popupWithAvatar.setEventListeners();

const profilePopup = new PopupWithForm('.popup_profile', {
  handleSubmit: (data) => {
    profilePopup.setSubmitButtonText('Сохранение...');
    api.changeProfileAPI(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        profilePopup.close();
      })
      .catch(err => console.log(err))
      .finally(() => profilePopup.setSubmitButtonText('Сохранить'));
  }
}, {
  resetValidation: () => {
    console.log('reset validation');
  }
})
profilePopup.setEventListeners();

const cardAddPopup = new PopupWithForm('.popup_card', {
  handleSubmit: (data) => {
    cardAddPopup.setSubmitButtonText('Создание...');
    api.createCardAPI(data)
      .then((data) => {
        newCard.renderItem(data, data.owner._id);
        cardAddPopup.close();
      })
      .catch(err => console.log(err))
      .finally(() => {
        cardAddPopup.setSubmitButtonText('Создать')
      })
  }
}, {
  resetValidation: () => {
    console.log('reset validation');
  }
});
cardAddPopup.setEventListeners();

editProfileButton.addEventListener('click', function () {
  profilePopup.open();
  profilePopup.setInputValues(userInfo.getUserInfo());  
  descriptionInput.value = descriptionElement.textContent;
  formProfileValidity.enableButton();
});

newCardButton.addEventListener('click', function () {
  cardAddPopup.open();
});

function handleLike(card, id, cardToCreate) {
  if (card.dataset.isLiked === 'true') {
    api.deleteLikeAPI(id)
      .then((res) => {
        cardToCreate.deleteLike(res);
      })
      .catch(err => console.log(err));
  } else {
    api.putLikeAPI(id)
      .then((res) => {
        cardToCreate.putLike(res);
      })
      .catch(err => console.log(err));
  }
}

const avatarButton = document.querySelector('.profile__avatar-button');
avatarButton.addEventListener('click', () => {
  popupWithAvatar.open();
  formAvatarValidity.disableButton();
})

const newCard = new Section({
  renderer: (item, userId) => {
    const cardToCreate = new Card(item, userId, {
      handleCardClick: (name, link) => { popupWithImage.open(name, link) }
    }, {
      handleLike: (card, id) => { handleLike(card, id, cardToCreate) }
    }, {
      handleDelete: (id) => {
        api.deleteCardAPI(id)
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



