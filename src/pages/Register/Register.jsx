import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { register } from "../../services/actions/user";
import { Link, useHistory } from "react-router-dom";
import { useFormAndValidation } from "../../services/hooks/useFormsAndValidation";
import Loader from "../../components/Loader/Loader";
import styles from "./Register.module.scss";

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userInfo, isAuthChecked } = useSelector((state) => state.user);
  const { values, handleChange, isValid } = useFormAndValidation(
    { name: "", email: "", password: "" },
    false
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(register(values));
  };

  useEffect(() => {
    userInfo && history.push("/");
  }, [userInfo, history]);

  return isAuthChecked ? (
    <div className={`${styles.container}`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={`${styles.loginTitle}  text text_type_main-medium`}>
          Регистрация
        </h1>
        <Input
          type="text"
          placeholder="Имя"
          name="name"
          onChange={(evt) => handleChange(evt)}
          value={values.name}
        />
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
          onChange={(evt) => {
            handleChange(evt);
          }}
          value={values.password}
          errorText={"Длина пароля должна быть более 5 символов"}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!isValid}
        >
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
  ) : (
    <Loader />
  );
};

export default Register;
