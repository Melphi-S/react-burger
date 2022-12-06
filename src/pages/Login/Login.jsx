import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { logIn } from "../../services/actions/user";
import { useFormAndValidation } from "../../services/hooks/useFormsAndValidation";
import Loader from "../../components/Loader/Loader";
import styles from "./Login.module.scss";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const {userInfo, isAuthChecked }  = useSelector((state) => state.user);
  const {values, handleChange, isValid} = useFormAndValidation({email: '', password: ''}, false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(logIn(values));
  };

  useEffect(() => {
    if (userInfo) {
      location.state && location.state.from
        ? history.push(location.state.from.pathname)
        : history.push("/");
    }
  }, [userInfo, history, location]);

  return (
    isAuthChecked ?
    <div className={`${styles.container}`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={`${styles.title}  text text_type_main-medium`}>Вход</h1>
        <EmailInput
          placeholder="E-mail"
          name="email"
          onChange={(evt) => handleChange(evt)}
          value={values.email}
          errorText={"Введите e-mail"}
        />
        <PasswordInput
          placeholder="Пароль"
          name="password"
          onChange={(evt) => handleChange(evt)}
          value={values.password}
          errorText={"Длина пароля должна быть более 5 символов"}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!isValid}
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
