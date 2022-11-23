import { currentApi } from "../../utils/Api";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const register = (email, password, name) => {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST
    });
    currentApi
      .register(email, password, name)
      .then((res) => {
        res &&
          res.success &&
          dispatch({
            type: REGISTER_SUCCESS,
            payload: res.user
          });
        localStorage.setItem("refreshToken", res.refreshToken);
        setCookie("accessToken", res.accessToken);
      })
      .catch((err) =>
        dispatch({
          type: REGISTER_FAILED,
        })
      );
  };
};

export const getUserInfo = () => {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    currentApi
      .getUserInfo("accessToken")
      .then((res) => {
        res &&
          res.success &&
          dispatch({
            type: GET_USER_SUCCESS,
            payload: res.user
          });
      })
      .catch((err) =>
        dispatch({
          type: GET_USER_FAILED
        })
      );
  };
};

export function setCookie(name, value, props) {
  props = {
    path: "/",
    ...props,
  };
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
