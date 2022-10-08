import { URL } from "./consts";

class Api {
    constructor(url) {
        this.url = url
    }

    _checkResponce(res) {
        return res.ok ? res.json() : Promise.reject(res);
      }

    getIngredients() {
        return fetch(`${this.url}/ingredients`).then(this._checkResponce);
    }
}

const currentApi = new Api(URL);

export { currentApi };