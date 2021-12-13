const container = document.querySelector('.page');
const profileInfo = container.querySelector('.profile__info');
const editButton = profileInfo.querySelector('.profile__button_type_edit');
const popUp = container.querySelector('.popup__container');
const closeButton = container.querySelector('.popup__close');
const formElement = document.querySelector('[name="edit-profile"]');
const profileTitle = profileInfo.querySelector('.profile__name');
const profileJob = profileInfo.querySelector('.profile__description');
const nameInput = document.querySelector('[name="name"]');
const jobInput = document.querySelector('[name="about"]');

function openPopUp() {
  popUp.classList.add('popup_opened');
}

function closePopUp() {
  popUp.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopUp);
closeButton.addEventListener('click', closePopUp);

editButton.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;

});

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopUp();

}

formElement.addEventListener('submit', formSubmitHandler);

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

const elementCard = document.querySelector('#cards').content;
const containerElements = document.querySelector('.elements');

function addCards(imageUrl, descriptionName) {
  const elementDiv = elementCard.querySelector('.elements__card').cloneNode(true);

  elementDiv.querySelector('.elements__image').src = imageUrl;
  elementDiv.querySelector('.elements__image').alt = descriptionName;
  elementDiv.querySelector('.elements__header').textContent = descriptionName;
  return elementDiv;

}

containerElements.append(initialCards[1], initialCards[2]);
