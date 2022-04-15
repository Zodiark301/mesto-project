import Popup from "./popup";

export default class PopupWithForm extends Popup {
  constructor(selector, { handleSubmit }, { resetValidation }) {
    super(selector);
    this._handleSubmit = handleSubmit;
    this._formEl = this._popupElement.querySelector('.popup__form');
    this._submitButton = this._popupElement.querySelector('.popup__button');
    this._inputList = this._popupElement.querySelectorAll('.popup__input');
    this._resetValidation = resetValidation;
  }
  setSubmitButtonText(text) {
    this._submitButton.textContent = text;
  }
  close() {
    super.close();
    this._formEl.reset();
  }

  _getInputsValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._formEl.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputsValues());
    })
  }
  setInputValues(userData) {
    this._inputList.forEach((item) => {
      item.value = userData[item.id];
    })
  }
}



