import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { resetPassword } from "../../services/actions/user";
import styles from "./Reset-password.module.scss";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const { resetPasswordSuccess, forgotPasswordSuccess } = useSelector(
    (state) => state.user
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(resetPassword(password, token));
  };

  useEffect(() => {
    !forgotPasswordSuccess && history.push("/forgot-password");
    resetPasswordSuccess && history.push("/login");
  }, [resetPasswordSuccess, forgotPasswordSuccess, history]);

  const isValidPassword = (password) => password.length > 5;

  const isValidToken = (token) => token.length > 0;

  const isValidDetails = useMemo(
    () => isValidToken(token) && isValidPassword(password),
    [token, password]
  );

  return (
    <div className={`${styles.container}`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={`${styles.title}  text text_type_main-medium`}>
          Восстановление пароля
        </h1>
        <PasswordInput
          placeholder="Введите новый пароль"
          name="password"
          onChange={(evt) => {
            setPassword(evt.target.value);
          }}
          value={password}
          errorText={"Длина пароля должна быть более 5 символов"}
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          name="token"
          onChange={(evt) => {
            setToken(evt.target.value);
          }}
          value={token}
          errorText={"Введите код из письма"}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!isValidDetails}
        >
          Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
};

export default ResetPassword;
