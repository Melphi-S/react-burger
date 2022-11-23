import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./Register.module.scss";

const Register = () => {
  return (
    <div className={`${styles.container}`}>
      <form className={styles.form}>
        <h1 className={`${styles.loginTitle}  text text_type_main-medium`}>
          Регистрация
        </h1>
        <Input type="text" placeholder="Имя" name="name" />
        <EmailInput placeholder="E-mail" name="email" />
        <PasswordInput placeholder="Пароль" name="password" />
        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы?
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
};

export default Register;
