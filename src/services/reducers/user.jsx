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
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  CHECK_AUTH,
  SHOW_INFO_BOARD,
  HIDE_INFO_BOARD,
} from "../actions/user";

const userInitialState = {
  userInfo: null,
  isAuthChecked: false,
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
  forgotPasswordRequest: false,
  forgotPasswordSuccess: false,
  forgotPasswordFailed: false,
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,
  errorMessage: null,
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
        errorMessage: null,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        registerRequest: false,
        registerFailed: true,
        errorMessage: action.payload,
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
        patchUserSuccess: false
      };
    case PATCH_USER_SUCCESS:
      return {
        ...state,
        patchUserRequest: false,
        patchUserFailed: false,
        userInfo: action.payload.userInfo,
        errorMessage: action.payload.message,
      };
    case PATCH_USER_FAILED:
      return {
        ...state,
        patchUserRequest: false,
        patchUserFailed: true,
        errorMessage: action.payload,
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
        errorMessage: null,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
        errorMessage: action.payload,
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
        errorMessage: null,
      };
    case LOGOUT_FAILED:
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true,
        errorMessage: action.payload,
      };
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        forgotPasswordRequest: true,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordSuccess: true,
        forgotPasswordFailed: false,
        errorMessage: null,
      };
    case FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordSuccess: false,
        forgotPasswordFailed: true,
        errorMessage: action.payload,
      };
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        resetPasswordRequest: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordSuccess: true,
        resetPasswordFailed: false,
        forgotPasswordSuccess: false,
        errorMessage: null,
      };
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: true,
        errorMessage: action.payload,
      };
    case CHECK_AUTH:
      return {
        ...state,
        isAuthChecked: true,
      };
    case SHOW_INFO_BOARD:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case HIDE_INFO_BOARD:
      return {
        ...state,
        errorMessage: null,
      };
    default:
      return state;
  }
};
