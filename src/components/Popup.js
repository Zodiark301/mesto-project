export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector('.popup__close');
  }
  open() {
    this._popupElement.classList.add('popup_opened');
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
  }

  escClose(evt) {
    if (evt.key === 'Escape') this.close();
  }

  overlayClose(evt) {
    if (evt.target.classList.contains('popup')) this.close();
  }

  setEventListeners() {
    this._closeButton.addEventListener(('click'), () => {
      this.close();
    })
    document.addEventListener('keydown', (evt) => {
      this.escClose(evt);
    });
    this._popupElement.addEventListener('click', (evt) => {
      this.overlayClose(evt);
    })
  }
}
