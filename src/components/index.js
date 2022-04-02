import '../pages/index.css';

import { Card, editProfileButton, newCardButton, placesList, getCard } from './card.js';
import { enableValidation, validationConfig } from './validate.js';
import { clearCardForm, openPopup } from './utils.js';
import { editProfilePopup, descriptionElement, nameInput, descriptionInput, nameElement, newCardPopup, profileAvatar, popupAvatar, nameProfileImage } from './modal.js';
import API from './api.js';

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
      const myCard = new Card(currentData);  
      document.userInfo = user;      
      return myCard._generate();
    });    
    placesList.prepend(...initialCards);
    
  })
  .catch(err => {
    console.log(err);
  });


enableValidation(validationConfig);
