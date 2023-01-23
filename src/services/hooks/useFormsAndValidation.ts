import { useState, useCallback, ChangeEvent } from "react";
import { TForm } from "../../types/user";

export function useFormAndValidation(
  initialState: TForm,
  isProfileForm: boolean
) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const isValidName = (name: string | undefined) =>
    name || name === "" ? name.length > 0 : true;

  const isValidEmail = (email: string | undefined) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email || email === "" ? re.test(email) : true;
  };

  const isValidPassword = (password: string | undefined) => {
    if (isProfileForm) {
      return password?.length ? password.length > 5 : true;
    }
    return password || password === "" ? password.length > 5 : true;
  };

  const isValidToken = (token: string | undefined) =>
    token || token === "" ? token.length > 0 : true;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(
      isValidEmail(name === "email" ? value : values.email) &&
        isValidPassword(name === "password" ? value : values.password) &&
        isValidToken(name === "token" ? value : values.token) &&
        isValidName(name === "name" ? value : values.name)
    );
  };

  const resetForm = useCallback(() => {
    setValues(initialState);
    setErrors({});
    setIsValid(false);
  }, [setValues, setErrors, setIsValid, initialState]);

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
}
