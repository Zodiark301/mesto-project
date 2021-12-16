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

// Кнопки добавление карточек
//const addCardPopup = document.querySelector('.popup_card');
//const addButtonProfile = container.querySelector('.profile__info');
const buttonAddCard = document.querySelector('.profile__button_type_add');
const formElementadd = document.querySelector('[name="addButton"]');
//const closeButton = addCardPopup.querySelector('.popup__close-button');


// Открытие попап окна
function openPopUp() {
  popUp.classList.add('popup_opened');
}

// Закрытие попап окна
function closePopUp() {
  popUp.classList.remove('popup_opened');
}

// Обработчик события Click на открытие попапа
editButton.addEventListener('click', openPopUp);
closeButton.addEventListener('click', closePopUp);

// Обработчик события Click
function openAdd() {
  formElementadd.addEventListener('click', openPopUp);
  closeButton.addEventListener('click', closePopUp);
}
openAdd();

// Получение данных из полей
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

// Массив стандартных карточек
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

// Поиск элементов одной карточки
const elementCard = document.querySelector('#cards').content;
const containerElements = document.querySelector('.elements__list');

// template шаблон одной карточки
function addCards(imageUrl, descriptionName) {
  // Клонирование template шаблона
  const elementDiv = elementCard.querySelector('.elements__card').cloneNode(true);
  // Ищем класс кнопки сердечка карточки
  const cardLike = elementDiv.querySelector('.elements__like');
  // Поля template шаблона
  elementDiv.querySelector('.elements__image').src = imageUrl;
  elementDiv.querySelector('.elements__image').alt = descriptionName;
  elementDiv.querySelector('.elements__header').textContent = descriptionName;
  // Вызов функции лайков каждой карточки
  cardLike.addEventListener('click', pressLike);
  return elementDiv;
}

// Ищем и меняем класс в лайках
function pressLike(event) {
  event.target.classList.toggle('elements__like_active');
};

// Добавляем стандартные карточки
const standartCards = initialCards.map(function (elementDiv) {
  // Возвращаем элементы объекта из массива
  return addCards(elementDiv.link, elementDiv.name);
});
// Добавляем карточки в ко
containerElements.prepend(...standartCards);


