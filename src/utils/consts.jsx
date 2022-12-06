const ingredientTypes = {
  bun: "bun",
  sauce: "sauce",
  main: "main",
};

const infoMessages = [
  {
    payloadMessage: "email or password are incorrect",
    boardMessage:
      "Пользователь с таким e-mail не зарегистрирован, либо введён неправильный пароль",
  },
  {
    payloadMessage: "Incorrect reset token",
    boardMessage: "Введён неправильный код",
  },
  {
    payloadMessage: "User already exists",
    boardMessage: "Пользователь с таким e-mail уже зарегистрирован",
  },
  {
    payloadMessage: "User with such email already exists",
    boardMessage: "Пользователь с таким e-mail уже существует",
  },
  {
    payloadMessage: "Unauthorized user",
    boardMessage: "Пожалуйста, авторизуйтесь для оформления заказа",
  },
  {
    payloadMessage: "User info changed",
    boardMessage: "Данные успешно изменены",
  },
  {
    payloadMessage: "Password changed",
    boardMessage: "Пароль успешно изменен",
  },
];

const defaultMessage = "Что-то пошло не так – попробуйте повторить позже";

const orderStatuses = {
  created: "Создан",
  pending: "Готовится",
  done: "Выполнен"
}


const URL = "https://norma.nomoreparties.space/api";
const ORDERS_URL = "wss://norma.nomoreparties.space/orders"

export { ingredientTypes, URL, ORDERS_URL, infoMessages, defaultMessage, orderStatuses };
