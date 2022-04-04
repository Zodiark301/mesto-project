import '../pages/index.css';
import Card from '../components/Card.js';
import {editProfileButton, newCardButton, cardListSelector} from '../utils/constants.js';
import { enableValidation, validationConfig } from '../components/validate.js';
import { clearCardForm, openPopup } from '../utils/utils.js';
import { editProfilePopup, descriptionElement, nameInput, descriptionInput, nameElement, newCardPopup, profileAvatar, popupAvatar, nameProfileImage } from '../components/modal.js';
import API from '../components/api.js';
import Section from '../components/Section';


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

Promise.all([API.gettingProfile(), API.gettingCards()])
  .then(([user, card]) => {
    nameElement.textContent = user.name;
    descriptionElement.textContent = user.about;
    nameProfileImage.src = user.avatar;    
    document.userInfo = user;
    const cardsList = new Section ({data:card}, cardListSelector)
    cardsList.renderItems();
  })
  .catch(err => {
    console.log(err);
  });


enableValidation(validationConfig);
