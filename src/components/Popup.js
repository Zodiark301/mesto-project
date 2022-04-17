export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector('.popup__close');
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEsc);
    this._popupElement.addEventListener('mousedown', this._handleOvelay);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEsc);
    this._popupElement.removeEventListener('mousedown', this._handleOvelay);
  }

  _handleEsc = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  _handleOvelay = (evt) => {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButton.addEventListener(('click'), () => {
      this.close();
    })
  }
}
