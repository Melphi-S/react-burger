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
    setPassword('');
  }

  const isValidChanges = useMemo(() => userInfo
  ? userInfo.email !== email ||
      userInfo.name !== name ||
      password.length > 5
  : false, [userInfo, email, name, password]) 

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
      />
      <PasswordInput
        placeholder="Пароль"
        name="password"
        onChange={(evt) => {
          setPassword(evt.target.value);
        }}
        value={password}
        icon={"EditIcon"}
      />
      {isValidChanges && (
        <div className={styles.form__buttonContainer}>
          <Button htmlType="button" type="secondary" size="medium" onClick={resetChanges}>
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};

export default ProfileForm;
