import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, FormEvent, FC } from "react";
import { useSelector, useDispatch } from "../../types/store";
import { Link, useHistory } from "react-router-dom";
import { resetPassword } from "../../services/actions/user";
import { useFormAndValidation } from "../../services/hooks/useFormsAndValidation";
import styles from "./Reset-password.module.scss";

const ResetPassword: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { values, handleChange, isValid } = useFormAndValidation(
    { password: "", token: "" },
    false
  );

  const { resetPasswordSuccess, forgotPasswordSuccess } = useSelector(
    (state) => state.user
  );

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(resetPassword(values));
  };

  useEffect(() => {
    !forgotPasswordSuccess && history.push("/forgot-password");
    resetPasswordSuccess && history.push("/login");
  }, [resetPasswordSuccess, forgotPasswordSuccess, history]);

  return (
    <div className={`${styles.container}`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={`${styles.title}  text text_type_main-medium`}>
          Восстановление пароля
        </h1>
        <PasswordInput
          placeholder="Введите новый пароль"
          name="password"
          onChange={(evt) => handleChange(evt)}
          value={values.password ? values.password : ""}
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          name="token"
          onChange={(evt) => handleChange(evt)}
          value={values.token ? values.token : ""}
          errorText={"Введите код из письма"}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!isValid}
        >
          Сохранить
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

export default ResetPassword;
