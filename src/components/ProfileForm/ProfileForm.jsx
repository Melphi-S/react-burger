import { useDispatch, useSelector } from "react-redux";
import { useMemo, useEffect } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { patchUserInfo } from "../../services/actions/user";
import { useFormAndValidation } from "../../services/hooks/useFormsAndValidation";
import {
  startUserWsConnection,
  closeUserWsConnection,
} from "../../services/actions/wsOrders";
import styles from "./ProfileForm.module.scss";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const { name, email } = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    userInfo && dispatch(startUserWsConnection());

    return () => dispatch(closeUserWsConnection());
  }, [userInfo, dispatch]);

  const { values, handleChange, isValid, resetForm, setValues } =
    useFormAndValidation({ name: name, email: email, password: "" }, true);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(patchUserInfo(values));
    setValues({ ...values, password: "" });
  };

  const isValidChanges = useMemo(
    () =>
      userInfo &&
      isValid &&
      (userInfo.email !== values.email ||
        userInfo.name !== values.name ||
        values.password.length),
    [userInfo, values, isValid]
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Имя"
        name="name"
        onChange={(evt) => handleChange(evt)}
        value={values.name}
        icon={"EditIcon"}
      />
      <EmailInput
        placeholder="E-mail"
        name="email"
        onChange={(evt) => handleChange(evt)}
        value={values.email}
        isIcon={true}
        errorText={"Введите e-mail"}
      />
      <PasswordInput
        placeholder="Пароль"
        name="password"
        onChange={(evt) => {
          handleChange(evt);
        }}
        value={values.password}
        icon={"EditIcon"}
        errorText={"Длина пароля должны быть более 5 символов"}
      />
      {isValidChanges ? (
        <div className={styles.form__buttonContainer}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={resetForm}
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
