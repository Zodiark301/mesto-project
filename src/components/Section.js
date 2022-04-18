export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector('.elements__list');
  }

  renderItems(items, userId) {
    items.forEach((item) => {
      this._appendElement(this._renderer(item, userId));
    });
  }
  _appendElement(element) {
    this._container.append(element);
    console.log(this._container);
  }
  _prependElement(element) {
    this._container.prepend(element);
  }
  renderItem(item, userId) {
    this._prependElement(this._renderer(item, userId));
  }
}
