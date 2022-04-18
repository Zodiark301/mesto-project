import '../pages/index.css';

import Card from '../components/Card.js';
import { editProfileButton, newCardButton, validationConfig, avatarButton, cardListSelector } from '../utils/constants.js';
import API from '../components/API.js';
import Section from '../components/Section';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/userInfo';
import FormValidator from '../components/FormValidator';

const userInfo = new UserInfo('.profile', '.profile__avatar', '.profile__name', '.profile__description');

const api = new API({
  url: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: 'ea769cc4-10ce-4fe4-88ef-99f1e88db45d',
    'Content-Type': 'application/json'
  }
});

const formValidators = {}
// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')
    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(validationConfig);

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
});
cardAddPopup.setEventListeners();

const newCard = new Section({
  renderer: (item, userId) => {
    const cardToCreate = new Card(item, userId, {
      handleCardClick: (name, link) => {
        popupWithImage.open(name, link)
      }
    }, {
      handleLike: (card, id) => { handleLike(card, id, cardToCreate) }
    }, {
      handleDelete: (id) => {
        api.deleteCardAPI(id)
          .then(() => {
            document.querySelector(`.elements__card[data-id="${id}"]`).remove();
          }).catch(err => console.log(err));
      }
    }, 'adad',);
    return cardToCreate.generate();
  }
}, cardListSelector);

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

editProfileButton.addEventListener('click', () => {
  profilePopup.open();
  profilePopup.setInputValues(userInfo.getUserInfo());
  formValidators[profilePopup.formEl.getAttribute('name')].resetValidation();
});

newCardButton.addEventListener('click', () => {
  cardAddPopup.open();
  formValidators[cardAddPopup.formEl.getAttribute('name')].resetValidation();
});

avatarButton.addEventListener('click', () => {
  popupWithAvatar.open();
  formValidators[popupWithAvatar.formEl.getAttribute('name')].resetValidation();
})

Promise.all([api.gettingProfileAPI(), api.gettingCardsAPI()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    userInfo.setUserAvatar(user);
    newCard.renderItems(cards, user._id);
  })
  .catch(err => {
    console.log(err);
  });
