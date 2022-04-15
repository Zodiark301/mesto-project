export default class FormValidator {
  constructor (config, selector) {
    this._config = config;
    this._form = document.querySelector(selector);
    this._inputList = Array.from(
      this._form.querySelectorAll(this._config.inputSelector));
    this._buttonEl = this._form.querySelector(this._config.buttonSelector);
  }
  _showInputError = (inputElement, errorElement, errorMessage) => {
   inputElement.classList.add(this._config.inputInvalidClass);
   errorElement.classList.add(this._config.errorClass);
   errorElement.textContent = errorMessage;
  };
  
  _hideInputError = (inputElement, errorElement) => {
   inputElement.classList.remove(this._config.inputInvalidClass);
   errorElement.classList.remove(this._config.errorClass);
   errorElement.textContent = '';
  };
  
  _checkinputValidity = (inputElement) => {
   const errorElement = this._form.querySelector(`#error-${inputElement.id}`);
   console.log(errorElement);
   if (inputElement.validity.valid) {
     this._hideInputError(inputElement, errorElement)
   } else {
     this._showInputError(inputElement, errorElement, inputElement.validationMessage);
   }
  };
  
  // Функция добавления класса кнопки и выключения кнопки для нажатия
  disableButton = () => {
   this._buttonEl.classList.add(this._config.buttonDisabledClass);
   this._buttonEl.disabled = true;
  };
  
  // Функция удаления класса кнопки включения кнопки для нажатия
  enableButton = () => {
   this._buttonEl.classList.remove(this._config.buttonDisabledClass);
   this._buttonEl.disabled = false;
  };
  
  // Проверка всех полей формы на правильность заполнения
  _hasInvalidInput = () => {
   return this._inputList.some(inputElement => {
     return !inputElement.validity.valid;
   });
  };
  
  _toggleButtonState = () => {
   if (this._hasInvalidInput()) {
     this.disableButton();
   } else {
     this.enableButton();
   }
  };
  
  _setEventListeners = (formElement) => {  
   this._inputList.forEach(inputElement => {
     inputElement.addEventListener('input', () => {
       this._checkinputValidity(inputElement);
       this._toggleButtonState();
     });
   });
   this._toggleButtonState();
   
  };
  enableValidation () {
    this._setEventListeners (); 
  }
}


