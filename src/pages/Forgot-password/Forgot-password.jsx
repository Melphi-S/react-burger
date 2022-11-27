import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { requestPasswordReset } from "../../services/actions/user";
import styles from "./Forgot-password.module.scss";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const forgotPasswordSuccess = useSelector(
    (state) => state.user.forgotPasswordSuccess
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(requestPasswordReset(email));
  };

  useEffect(() => {
    forgotPasswordSuccess && history.push("/reset-password");
  }, [forgotPasswordSuccess, history]);

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div className={`${styles.container}`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={`${styles.title}  text text_type_main-medium`}>
          Восстановление пароля
        </h1>
        <EmailInput
          placeholder="Укажите e-mail"
          name="email"
          onChange={(evt) => setEmail(evt.target.value)}
          value={email}
          errorText={"Введите e-mail"}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!isValidEmail}
        >
          Восстановить
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

export default ForgotPassword;
