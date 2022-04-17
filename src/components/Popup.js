export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector('.popup__close');
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this.escClose);
    this._popupElement.addEventListener('mousedown', this.overlayClose);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this.escClose);
    this._popupElement.removeEventListener('mousedown', this.overlayClose);
  }

  escClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  overlayClose = (evt) => {
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
