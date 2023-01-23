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
} from "../services/actions/user";

export type TUserActions =
  | TRegisterRequestAction
  | TRegisterSuccessAction
  | TRegisterFailedAction
  | TGetUserRequestAction
  | TGetUserSuccessAction
  | TGetUserFailedAction
  | TPatchUserRequestAction
  | TPatchUserSuccessAction
  | TPatchUserFailedAction
  | TLoginRequestAction
  | TLoginSuccessAction
  | TLoginFailedAction
  | TLogoutRequestAction
  | TLogoutSuccessAction
  | TLogoutFailedAction
  | TForgotPasswordRequestAction
  | TForgotPasswordSuccessAction
  | TForgotPasswordFailedAction
  | TResetPasswordRequestAction
  | TResetPasswordSuccessAction
  | TResetPasswordFailedAction
  | TCheckAuthAction
  | TShowInfoBoardAction
  | THideInfoBoardAction;

export type TForm = {
  email?: string;
  password?: string;
  name?: string;
  token?: string;
};

export type TRegisterForm = Required<Omit<TForm, "token">>;

export type TUserInfo = Required<Omit<TForm, "token" | "password">>;

export type TLoginForm = Required<Omit<TForm, "token" | "name">>;

export type TRequestForm = Required<Pick<TForm, "email">>;

export type TResetForm = Required<Omit<TForm, "email" | "name">>;

export type TUserState = {
  userInfo: TUserInfo | null;
  isAuthChecked: boolean;
  registerRequest: boolean;
  registerFailed: boolean;
  getUserRequest: boolean;
  getUserFailed: boolean;
  patchUserRequest: boolean;
  patchUserFailed: boolean;
  isTokenRefreshed: boolean;
  loginRequest: boolean;
  loginFailed: boolean;
  logoutRequest: boolean;
  logoutFailed: boolean;
  forgotPasswordRequest: boolean;
  forgotPasswordSuccess: boolean;
  forgotPasswordFailed: boolean;
  resetPasswordRequest: boolean;
  resetPasswordSuccess: boolean;
  resetPasswordFailed: boolean;
  errorMessage: string | null;
};

type TRegisterRequestAction = {
  readonly type: typeof REGISTER_REQUEST;
};

type TRegisterSuccessAction = {
  readonly type: typeof REGISTER_SUCCESS;
  readonly payload: TUserInfo;
};

type TRegisterFailedAction = {
  readonly type: typeof REGISTER_FAILED;
  readonly payload: string;
};

type TGetUserRequestAction = {
  readonly type: typeof GET_USER_REQUEST;
};

type TGetUserSuccessAction = {
  readonly type: typeof GET_USER_SUCCESS;
  readonly payload: TUserInfo;
};

type TGetUserFailedAction = {
  readonly type: typeof GET_USER_FAILED;
};

type TPatchUserRequestAction = {
  readonly type: typeof PATCH_USER_REQUEST;
};

type TPatchUserSuccessAction = {
  readonly type: typeof PATCH_USER_SUCCESS;
  readonly payload: { userInfo: TUserInfo; message: string };
};

type TPatchUserFailedAction = {
  readonly type: typeof PATCH_USER_FAILED;
  readonly payload: string;
};

type TLoginRequestAction = {
  readonly type: typeof LOGIN_REQUEST;
};

type TLoginSuccessAction = {
  readonly type: typeof LOGIN_SUCCESS;
  readonly payload: TUserInfo;
};

type TLoginFailedAction = {
  readonly type: typeof LOGIN_FAILED;
  readonly payload: string;
};

type TLogoutRequestAction = {
  readonly type: typeof LOGOUT_REQUEST;
};

type TLogoutSuccessAction = {
  readonly type: typeof LOGOUT_SUCCESS;
};

type TLogoutFailedAction = {
  readonly type: typeof LOGOUT_FAILED;
  readonly payload: string;
};

type TForgotPasswordRequestAction = {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
};

type TForgotPasswordSuccessAction = {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
};

type TForgotPasswordFailedAction = {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
  readonly payload: string;
};

type TResetPasswordRequestAction = {
  readonly type: typeof RESET_PASSWORD_REQUEST;
};

type TResetPasswordSuccessAction = {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  readonly payload: string;
};

type TResetPasswordFailedAction = {
  readonly type: typeof RESET_PASSWORD_FAILED;
  readonly payload: string;
};

type TCheckAuthAction = {
  readonly type: typeof CHECK_AUTH;
};

export type TShowInfoBoardAction = {
  readonly type: typeof SHOW_INFO_BOARD;
  readonly payload: string;
};

export type THideInfoBoardAction = {
  readonly type: typeof HIDE_INFO_BOARD;
};
