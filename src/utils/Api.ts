import { URL } from "./consts";
import { TOrder } from "../types/order";
import {
  TResponse,
  TMessage,
  TIngredientsResponse,
  TUserResponse,
  TPostOrderResponse,
  TGetOrderResponse,
  TLoginResponse,
  TRefreshToken,
} from "../types/api";

class Api {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  _checkResponce<T>(res: Response) {
    return res.ok
      ? res.json().then((data: TResponse<T>) => data)
      : res.json().then((data: TResponse<TMessage>) => Promise.reject(data));
  }

  getIngredients() {
    return fetch(`${this.url}/ingredients`).then(
      this._checkResponce<TIngredientsResponse>
    );
  }

  postOrder(order: TOrder, token: string = "") {
    return fetch(`${this.url}/orders`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(order),
    }).then(this._checkResponce<TPostOrderResponse>);
  }

  getOrder(orderNumber: number) {
    return fetch(`${this.url}/orders/${orderNumber}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }).then(this._checkResponce<TGetOrderResponse>);
  }

  register(email: string, password: string, name: string) {
    return fetch(`${this.url}/auth/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    }).then(this._checkResponce<TLoginResponse>);
  }

  getUserInfo(token: string = "") {
    return fetch(`${this.url}/auth/user`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    }).then(this._checkResponce<TUserResponse>);
  }

  patchUserInfo(
    email: string,
    password: string,
    name: string,
    token: string = ""
  ) {
    return fetch(`${this.url}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ email, password, name }),
    }).then(this._checkResponce<TUserResponse>);
  }

  refreshToken(token: string | null) {
    return fetch(`${this.url}/auth/token`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    }).then(this._checkResponce<TRefreshToken>);
  }

  logIn(email: string, password: string) {
    return fetch(`${this.url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponce<TLoginResponse>);
  }

  logOut(token: string | null) {
    return fetch(`${this.url}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ token }),
    }).then(this._checkResponce<TMessage>);
  }

  requestPasswordReset(email: string) {
    return fetch(`${this.url}/password-reset`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email }),
    }).then(this._checkResponce<TMessage>);
  }

  resetPassword(password: string, token: string) {
    return fetch(`${this.url}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ password, token }),
    }).then(this._checkResponce<TMessage>);
  }
}

const currentApi = new Api(URL);

export { currentApi };
