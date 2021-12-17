// Поиск контейнера всего содержимого сайта
const container = document.querySelector('.page');

// Поиск классов попап окон
const popUp = container.querySelector('.popup__container');

// Поиск попапа и кнопок с полями редактирования профиля
const formElementadd1 = container.querySelector('.popup_profile');
const closeButton = formElementadd1.querySelector('.popup__close');
const profileInfo = container.querySelector('.profile__info');
const editButton = profileInfo.querySelector('.profile__button_type_edit');
const formElement = document.querySelector('[name="edit-profile"]');
const profileTitle = profileInfo.querySelector('.profile__name');
const profileJob = profileInfo.querySelector('.profile__description');
const nameInput = document.querySelector('[name="name"]');
const jobInput = document.querySelector('[name="about"]');

// Поиск попапа и кнопок добавления карточки
const formElementadd2 = container.querySelector('.popup_card');
const closeButtonCard = formElementadd2.querySelector('.popup__close');
const buttonAddCard = document.querySelector('.profile__button_type_add');
const formElementadd = document.querySelector('[name="addButton"]');

// Универсальная функция открытия попап окна
function openPopUp(popUp) {
  popUp.classList.add('popup_opened');
}

// Универсальная функция закрытия попап окна
function closePopUp(popUp) {
  popUp.classList.remove('popup_opened');
}

// Обработчик клика для открытия попапа редактирования профиля
editButton.addEventListener('click', editProfile);

// Функция открытия попапа и получения данных из полей профиля
function editProfile() {
  openPopUp(formElementadd1);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
}

// Функция сброса стандартного поведения отправки формы, замены данных введенных пользователем в блок профиля, закрытие попапа по кнопке сохранить
function submitHandlerForm(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopUp(formElementadd1);
}

// Обработчик формы следящий за событием 'submit'
formElement.addEventListener('submit', submitHandlerForm);

// Закрытие попапа редактирования профиля
closeButton.addEventListener('click', () => closePopUp(formElementadd1));

// Открытие попапа добавления карточки
buttonAddCard.addEventListener('click', function () {
  openPopUp(formElementadd2);
});

// Закрытие попапа добавления карточки пользователем
closeButtonCard.addEventListener('click', () => closePopUp(formElementadd2));

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


