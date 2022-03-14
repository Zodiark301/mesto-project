const validationConfig = {
  formSelector: '.popup__form', // Ищем по классу все формы
  inputSelector: '.popup__input', // Ищем все поля по классу
  inputInvalidClass: 'popup__input_invalid',
  errorClass: 'popup__error_visible',
  buttonSelector: '.popup__button',
  buttonDisabledClass: 'popup__button_disabled',
};

const showInputError = (inputElement, errorElement, errorMessage, config) => {
  inputElement.classList.add(config.inputInvalidClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (inputElement, errorElement, config) => {
  inputElement.classList.remove(config.inputInvalidClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const checkinputValidity = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);

  if (inputElement.validity.valid) {
    hideInputError(inputElement, errorElement, config)
  } else {
    showInputError(inputElement, errorElement, inputElement.validationMessage, config);
  }
};

// Функция добавления класса кнопки и выключения кнопки для нажатия
const disableButton = (buttonElement, config) => {
  buttonElement.classList.add(config.buttonDisabledClass);
  buttonElement.disabled = true;
};

// Функция удаления класса кнопки включения кнопки для нажатия
const enableButton = (buttonElement, config) => {
  buttonElement.classList.remove(config.buttonDisabledClass);
  buttonElement.disabled = false;
};

// Проверка всех полей формы на правильность заполнения
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (formElement, inputList, config) => {
  const buttonElement = formElement.querySelector(config.buttonSelector);

  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, config);
  } else {
    enableButton(buttonElement, config);
  }
};

const setEventListener = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkinputValidity(formElement, inputElement, config);
      toggleButtonState(formElement, inputList, config);
    });
  });

  toggleButtonState(formElement, inputList, config);
};
// Ищем все формы по классу
const enableValidation = (config) => { // Делаем функцию принимающую найденные поля в форме из объекта validationConfig
  const forms = Array.from(document.querySelectorAll(config.formSelector)) // Помещаем все в переменную и ищем все формы в документе по классу
  // помощью Array.from делаем из псевдомассива обычный массив для дальнейшего удобного использования

  forms.forEach(formElement => { // Проходимся по массиву полей и отменяем для них стандартное поведение отправки формы
    formElement.addEventListener('submit', event => { // Добавляем слушатель на кнопку отправки
      event.preventDefault(); // Отменяем стандартное поведение кнопки отправки
    });
    setEventListener(formElement, config);
  });
};

export { validationConfig, enableValidation, disableButton };
