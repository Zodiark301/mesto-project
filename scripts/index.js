const container = document.querySelector('.page');
const profileInfo = container.querySelector('.profile__info');
const editButton = profileInfo.querySelector('.profile__button_type_edit');
const popUp = container.querySelector('.popup__container');
const closeButton = container.querySelector('.popup__close');

function openPopUp() {
  let name = document.querySelector('.popup__input');
  let about = document.querySelector('.popup__input');
  popUp.classList.add('popup_opened');
}

function closePopUp() {
  popUp.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopUp);
closeButton.addEventListener('click', closePopUp);
console.log(typeof document.querySelector('.popup__input').value);
