import { currentApi } from "../../utils/Api";
import { setCookie } from "../../utils/cookie";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const register = (email, password, name) => {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    currentApi
      .register(email, password, name)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: REGISTER_SUCCESS,
            payload: res.user
          });
          localStorage.setItem("refreshToken", res.refreshToken);
          setCookie("accessToken", res.accessToken);
        }
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
      .getUserInfo()
      .then((res) => {
        res &&
          res.success &&
          dispatch({
            type: GET_USER_SUCCESS,
            payload: res.user
          });
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 403) {
          dispatch(refreshToken());
        }
        dispatch({
          type: GET_USER_FAILED
        });
      });
  };
};

export const refreshToken = () => {
  return function (dispatch) {
    currentApi
      .refreshToken()
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem("refreshToken", res.refreshToken);
          setCookie("accessToken", res.accessToken);
          dispatch(getUserInfo());
        }
      })
      .catch((err) =>
        dispatch({
          type: GET_USER_FAILED,
        })
      );
  };
};

export const login = (email, password) => {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    currentApi
      .login(email, password)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.user
          });
          localStorage.setItem("refreshToken", res.refreshToken);
          setCookie("accessToken", res.accessToken);
        }
      })
      .catch((err) =>
        dispatch({
          type: LOGIN_FAILED
        })
      );
  };
};
