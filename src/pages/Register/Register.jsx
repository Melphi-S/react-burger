import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { register, getUserInfo } from "../../services/actions/user";
import { Link, useHistory } from "react-router-dom";
import styles from "./Register.module.scss";

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const userInfo = useSelector((state) => state.user.userInfo)

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(register(email, password, name))
  }

  useEffect(() => {
    userInfo && history.push('/')
  }, [userInfo, history])


  return (
    <div className={`${styles.container}`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={`${styles.loginTitle}  text text_type_main-medium`}>
          Регистрация
        </h1>
        <Input
          type="text"
          placeholder="Имя"
          name="name"
          onChange={(evt) => setName(evt.target.value)}
          value={name}
        />
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
            setPassword(evt.target.value)}}
          value={password}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          onClick={() => register()}
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
  );
};

export default Register;
