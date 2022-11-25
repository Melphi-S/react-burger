import { currentApi } from "../../utils/Api";
import { setCookie, deleteCookie, getCookie } from "../../utils/cookie";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const PATCH_USER_REQUEST = "PATCH_USER_REQUEST";
export const PATCH_USER_SUCCESS = "PATCH_USER_SUCCESS";
export const PATCH_USER_FAILED = "PATCH_USER_FAILED";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

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
            payload: res.user,
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
      .getUserInfo(getCookie("accessToken"))
      .then((res) => {
        res &&
          res.success &&
          dispatch({
            type: GET_USER_SUCCESS,
            payload: res.user,
          });
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 403) {
          dispatch(refreshToken());
        }
        dispatch({
          type: GET_USER_FAILED,
        });
      });
  };
};

export const patchUserInfo = (email, password, name) => {
  return function (dispatch) {
    dispatch({
      type: PATCH_USER_REQUEST,
    });
    currentApi
      .patchUserInfo(email, password, name, getCookie("accessToken"))
      .then((res) => {
        res &&
          res.success &&
          dispatch({
            type: PATCH_USER_SUCCESS,
            payload: res.user,
          });
      })
      .catch((err) => {
        dispatch({
          type: PATCH_USER_FAILED,
        });
      });
  };
};

export const refreshToken = () => {
  return function (dispatch) {
    currentApi
      .refreshToken(localStorage.getItem("refreshToken"))
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

export const logIn = (email, password) => {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    currentApi
      .logIn(email, password)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.user,
          });
          localStorage.setItem("refreshToken", res.refreshToken);
          deleteCookie("accessToken");
          setCookie("accessToken", res.accessToken);
        }
      })
      .catch((err) =>
        dispatch({
          type: LOGIN_FAILED,
        })
      );
  };
};

export const logOut = () => {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    currentApi
      .logOut(localStorage.getItem("refreshToken"))
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: LOGOUT_SUCCESS,
          });
          localStorage.removeItem("refreshToken");
          deleteCookie("accessToken");
        }
      })
      .catch((err) =>
        dispatch({
          type: LOGOUT_FAILED,
        })
      );
  };
};
