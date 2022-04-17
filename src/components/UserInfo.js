export default class UserInfo {
  constructor(selector) {
    this._profileEl = document.querySelector(selector);
    this._profileAvatarEl = this._profileEl.querySelector('.profile__avatar');
    this._profileNameEl = this._profileEl.querySelector('.profile__name');
    this._aboutProfileEl = this._profileEl.querySelector('.profile__description');
  }

  setUserInfo({ name, about }) {
    this._name = name;
    this._about = about;
    this._profileNameEl.textContent = this._name;
    this._aboutProfileEl.textContent = this._about;
  }

  getUserInfo() {
    return {
      name: this._name,
      about: this._about
    }
  }
  setUserAvatar({ avatar }) {
    this._avatar = avatar;
    this._profileAvatarEl.src = this._avatar;
  }

}
