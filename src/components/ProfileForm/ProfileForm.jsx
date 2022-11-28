import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { patchUserInfo } from "../../services/actions/user";
import styles from "./ProfileForm.module.scss";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const isValidPassword = (password) => password.length > 0 ? password.length > 5 : true

  const isValidName = (name) => name.length > 0;

  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
      setName(userInfo.name);
    }
  }, [userInfo]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(patchUserInfo(email, password, name));
  };

  const resetChanges = () => {
    setEmail(userInfo.email);
    setName(userInfo.name);
    setPassword("");
  };

  const isValidChanges = useMemo(
    () =>
      userInfo
        ? (userInfo.email !== email ||
          userInfo.name !== name ||
          password.length) &&
          (isValidEmail(email) && isValidPassword(password) && isValidName(name))
        : false,
    [userInfo, email, name, password]
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Имя"
        name="name"
        onChange={(evt) => setName(evt.target.value)}
        value={name}
        icon={"EditIcon"}
      />
      <EmailInput
        placeholder="E-mail"
        name="email"
        onChange={(evt) => setEmail(evt.target.value)}
        value={email}
        isIcon={true}
        errorText={"Введите e-mail"}
      />
      <PasswordInput
        placeholder="Пароль"
        name="password"
        onChange={(evt) => {
          setPassword(evt.target.value);
        }}
        value={password}
        icon={"EditIcon"}
        errorText={'Длина пароля должны быть более 5 символов'}
      />
      {isValidChanges ? (
        <div className={styles.form__buttonContainer}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={resetChanges}
            extraClass={styles.form__cancelButton}
          >
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      ) : null}
    </form>
  );
};

export default ProfileForm;
