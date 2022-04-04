export default class Section {
  constructor ({data, renderer}, containerSelector) {
    this._itemsToRender = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  addItem (element) {
    this._container.append(element);
  }
  clear () {
    this._container.innerHTML = '';
  }
  
  renderItems () {
    this.clear();
    this._itemsToRender.forEach((item) => {
      this._renderer(item);
    })
  }
}