import { URL } from "./consts";

class Api {
  constructor(url) {
    this.url = url;
  }

  _checkResponce(res) {
    return res.ok ? res.json() : Promise.reject(res);
  }

  getIngredients() {
    return fetch(`${this.url}/ingredients`).then(this._checkResponce);
  }

  postOrder(order) {
    return fetch(`${this.url}/orders`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(order),
    }).then(this._checkResponce);
  }

  register(email, password, name) {
    return fetch(`${this.url}/auth/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({email, password, name}),
    }).then(this._checkResponce);
  }

  getUserInfo(accessToken) {
    return fetch(`${this.url}/auth/user`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: accessToken
      }
    }).then(this._checkResponce);
  }
}

const currentApi = new Api(URL);

export { currentApi };
