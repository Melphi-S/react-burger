import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, FormEvent, FC } from "react";
import { useSelector, useDispatch } from "../../types/store";
import { Link, useHistory } from "react-router-dom";
import { requestPasswordReset } from "../../services/actions/user";
import { useFormAndValidation } from "../../services/hooks/useFormsAndValidation";
import Loader from "../../components/Loader/Loader";
import styles from "./Forgot-password.module.scss";

const ForgotPassword: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const forgotPasswordSuccess = useSelector(
    (state) => state.user.forgotPasswordSuccess
  );
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
  const { values, handleChange, isValid } = useFormAndValidation(
    { email: "" },
    false
  );

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(requestPasswordReset(values));
  };

  useEffect(() => {
    forgotPasswordSuccess && history.push("/reset-password");
  }, [forgotPasswordSuccess, history]);

  return isAuthChecked ? (
    <div className={`${styles.container}`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={`${styles.title}  text text_type_main-medium`}>
          Восстановление пароля
        </h1>
        <EmailInput
          placeholder="Укажите e-mail"
          name="email"
          onChange={(evt) => handleChange(evt)}
          value={values.email ? values.email : ""}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!isValid}
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
  ) : (
    <Loader />
  );
};

export default ForgotPassword;
