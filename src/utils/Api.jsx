import { URL } from "./consts";
import { getCookie } from "./cookie";

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
      body: JSON.stringify({ email, password, name }),
    }).then(this._checkResponce);
  }

  getUserInfo(token) {
    return fetch(`${this.url}/auth/user`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    }).then(this._checkResponce);
  }

  patchUserInfo(email, password, name, token) {
    return fetch(`${this.url}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ email, password, name }),
    }).then(this._checkResponce);
  }

  refreshToken(token) {
    return fetch(`${this.url}/auth/token`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    }).then(this._checkResponce);
  }

  logIn(email, password) {
    return fetch(`${this.url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponce);
  }

  logOut(token) {
    return fetch(`${this.url}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ token }),
    }).then(this._checkResponce);
  }
}

const currentApi = new Api(URL);

export { currentApi };
