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
}

const currentApi = new Api(URL);

export { currentApi };
