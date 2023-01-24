import { useSelector, useDispatch } from "../../types/store";
import { useMemo, FormEvent } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { patchUserInfo } from "../../services/actions/user";
import { useFormAndValidation } from "../../services/hooks/useFormsAndValidation";
import styles from "./ProfileForm.module.scss";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const { name, email } = userInfo || { name: "", email: "" };

  const { values, handleChange, isValid, resetForm, setValues } =
    useFormAndValidation(
      {
        name: name,
        email: email,
        password: "",
      },
      true
    );

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
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
        (values.password && values.password.length)),
    [userInfo, values, isValid]
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Имя"
        name="name"
        onChange={(evt) => handleChange(evt)}
        value={values.name ? values.name : ""}
        icon={"EditIcon"}
      />
      <EmailInput
        placeholder="E-mail"
        name="email"
        onChange={(evt) => handleChange(evt)}
        value={values.email ? values.email : ""}
        isIcon={true}
      />
      <PasswordInput
        placeholder="Пароль"
        name="password"
        onChange={(evt) => {
          handleChange(evt);
        }}
        value={values.password ? values.password : ""}
        icon={"EditIcon"}
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
