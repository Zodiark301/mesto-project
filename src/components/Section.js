import Card from "./Card.js";

export default class Section {
  constructor ({data}, containerSelector) {
    this._renderedItems = data,
    this._container = document.querySelector(containerSelector);
  }
  setItem (element) {
    this._container.append(element);
  }
  clear () {
    this._container.innerHTML = '';
  }
  renderItems () {
    this._renderedItems.forEach((item) => {
      const card = new Card (item, '.elements__card');
      const cardElement = card._generate();
      this.setItem(cardElement);
    })
  }
}