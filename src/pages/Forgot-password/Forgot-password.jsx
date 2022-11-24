import {
    EmailInput,
    Button
  } from "@ya.praktikum/react-developer-burger-ui-components";
  import { Link } from "react-router-dom";
  import styles from "./Forgot-password.module.scss";
  
  const ForgotPassword = () => {
    return (
      <div className={`${styles.container}`}>
        <form className={styles.form}>
          <h1 className={`${styles.title}  text text_type_main-medium`}>Восстановление пароля</h1>
          <EmailInput placeholder="Укажите e-mail" name="email"/>
          <Button htmlType="submit" type="primary" size="medium">
            Восстановить
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive mt-20">
          Вспомнили пароль?
          <Link className={styles.link} to="/login">Войти</Link>
        </p>
      </div>
    );
  };
  
  export default ForgotPassword;
  