import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";

const Login = () => {
  return (
    <div className={`${styles.container}`}>
      <form className={styles.form}>
        <h1 className={`${styles.title}  text text_type_main-medium`}>Вход</h1>
        <EmailInput placeholder="E-mail" name="email"/>
        <PasswordInput placeholder="Пароль" name="password" />
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вы — новый пользователь?
        <Link className={styles.link} to="/register">Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?
        <Link className={styles.link} to="/forgot-password">Восстановить пароль</Link>
      </p>
    </div>
  );
};

export default Login;
