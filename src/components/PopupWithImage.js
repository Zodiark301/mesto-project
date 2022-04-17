import Popup from "./popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector('.popup__image ');
    this._imageTitle = this._popupElement.querySelector('.popup__caption');
  }
  open(name, link) {
    super.open();
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._imageTitle.textContent = name;
  }
}
