import {
    PasswordInput,
    Input,
    Button
  } from "@ya.praktikum/react-developer-burger-ui-components";
  import { Link } from "react-router-dom";
  import styles from "./Reset-password.module.scss";
  
  const ResetPassword = () => {
    return (
      <div className={`${styles.container}`}>
        <form className={styles.form}>
          <h1 className={`${styles.title}  text text_type_main-medium`}>Восстановление пароля</h1>
          <PasswordInput placeholder="Введите новый пароль" name="code" />
          <Input type="text" placeholder="Введите код из письма" name="code" />
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive mt-20">
          Вспомнили пароль?
          <Link className={styles.link} to="/login">Войти</Link>
        </p>
      </div>
    );
  };
  
  export default ResetPassword;
  