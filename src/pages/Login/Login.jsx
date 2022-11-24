import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { login } from "../../services/actions/user";
import styles from "./Login.module.scss";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userInfo = useSelector((state) => state.user.userInfo);

  console.log(location);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      (location.state && location.state.prevLocation) ? history.push(location.state.prevLocation.pathname) : history.push('/');
    }
  }, [userInfo, history, location])

  return (
    <div className={`${styles.container}`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={`${styles.title}  text text_type_main-medium`}>Вход</h1>
        <EmailInput
          placeholder="E-mail"
          name="email"
          onChange={(evt) => setEmail(evt.target.value)}
          value={email}
        />
        <PasswordInput
          placeholder="Пароль"
          name="password"
          onChange={(evt) => {
            setPassword(evt.target.value);
          }}
          value={password}
        />
        <Button htmlType="submit" type="primary" size="medium">
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
    </div>
  );
};

export default Login;
