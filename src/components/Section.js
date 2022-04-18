export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);    
  }

  renderItems(items, userId) {
    items.forEach((item) => {
      this._appendElement(this._renderer(item, userId));
    });
  }
  _appendElement(element) {
    this._container.append(element);
  }
  _prependElement(element) {
    this._container.prepend(element);
  }
  renderItem(item, userId) {
    this._prependElement(this._renderer(item, userId));
  }
}
