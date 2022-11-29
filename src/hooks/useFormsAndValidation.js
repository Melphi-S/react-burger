import { useState, useCallback } from "react";

export function useFormAndValidation(initialState, isProfileForm) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const isValidName = (name) => (name || name === "" ? name.length > 0 : true);

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email || email === "" ? re.test(email) : true;
  };

  const isValidPassword = (password) => {
    if (isProfileForm) {
      return password?.length ? password.length > 5 : true;
    }
    return password || password === "" ? password.length > 5 : true;
  };

  const isValidToken = (token) =>
    token || token === "" ? token.length > 0 : true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(
      isValidEmail(name === "email" ? value : values.email) &&
        isValidPassword(name === "password" ? value : values.password) &&
        isValidToken(name === "token" ? value : values.token) &&
        isValidName(name === "name" ? value : values.token)
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
