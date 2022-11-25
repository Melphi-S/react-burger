import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  PATCH_USER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "../actions/user";

const userInitialState = {
  userInfo: null,
  registerRequest: false,
  registerFailed: false,
  getUserRequest: false,
  getUserFailed: false,
  patchUserRequest: false,
  patchUserFailed: false,
  isTokenRefreshed: false,
  loginRequest: false,
  loginFailed: false,
  logoutRequest: false,
  logoutFailed: false,
};

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        registerRequest: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        registerRequest: false,
        registerFailed: false,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        registerRequest: false,
        registerFailed: true,
      };
    case GET_USER_REQUEST:
      return {
        ...state,
        getUserRequest: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        getUserRequest: false,
        getUserFailed: false,
        userInfo: action.payload,
      };
    case GET_USER_FAILED:
      return {
        ...state,
        getUserRequest: false,
        getUserFailed: true,
      };
    case PATCH_USER_REQUEST:
      return {
        ...state,
        patchUserRequest: true,
      };
    case PATCH_USER_SUCCESS:
      return {
        ...state,
        patchUserRequest: false,
        patchUserFailed: false,
        userInfo: action.payload,
      };
    case PATCH_USER_FAILED:
      return {
        ...state,
        patchUserRequest: false,
        patchUserFailed: true,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loginRequest: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        loginRequest: false,
        loginFailed: false,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        logoutRequest: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        userInfo: null,
        logoutRequest: false,
        logoutFailed: false,
      };
    case LOGOUT_FAILED:
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true,
      };
    default:
      return state;
  }
};
