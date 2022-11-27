import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { logIn } from "../../services/actions/user";
import Loader from "../../components/Loader/Loader";
import styles from "./Login.module.scss";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {userInfo, isAuthChecked }  = useSelector((state) => state.user);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(logIn(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      location.state && location.state.from
        ? history.push(location.state.from.pathname)
        : history.push("/");
    }
  }, [userInfo, history, location]);

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const isValidPassword = (password) => password.length > 5;

  const isValidDetails = useMemo(
    () => isValidEmail(email) && isValidPassword(password),
    [email, password]
  );

  return (
    isAuthChecked ?
    <div className={`${styles.container}`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={`${styles.title}  text text_type_main-medium`}>Вход</h1>
        <EmailInput
          placeholder="E-mail"
          name="email"
          onChange={(evt) => setEmail(evt.target.value)}
          value={email}
          errorText={"Введите e-mail"}
        />
        <PasswordInput
          placeholder="Пароль"
          name="password"
          onChange={(evt) => {
            setPassword(evt.target.value);
          }}
          value={password}
          errorText={"Длина пароля должна быть более 5 символов"}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!isValidDetails}
        >
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вы — новый пользователь?
        <Link className={styles.link} to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?
        <Link className={styles.link} to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </div> : <Loader />
  );
};

export default Login;
