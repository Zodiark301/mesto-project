import '../pages/index.css';
import Card from '../components/card';
import {editProfileButton, newCardButton, placesList} from '../utils/constants.js';
import { enableValidation, validationConfig } from '../components/validate.js';
import { clearCardForm, openPopup } from '../utils/utils.js';
import { editProfilePopup, descriptionElement, nameInput, descriptionInput, nameElement, newCardPopup, profileAvatar, popupAvatar, nameProfileImage } from '../components/modal.js';
import API from '../components/api.js';

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
    const initialCards = card.map(function (currentData) {    
      const myCard = new Card(currentData, '.elements__card');  
      document.userInfo = user;      
      return myCard._generate();
    });    
    placesList.prepend(...initialCards);    
  })
  .catch(err => {
    console.log(err);
  });


enableValidation(validationConfig);
