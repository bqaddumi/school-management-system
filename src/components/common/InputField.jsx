import React from "react";
import classNames from "classnames";
import classes from "./InputField.module.css";

const InputField = (props) => {
  const {
    label,
    onChange,
    type,
    placeholder,
    value,
    valdationRegex,
    errorEmailMessage,
    errorPasswordMessage,
    required,
    id,
    checkConfirm,
    isButtonClicked,
    autoComplete,
  } = props;
  const isValidated = !(!value.match(valdationRegex) && !!value);
  const showInvalidEmail = !isValidated && isButtonClicked;
  const isConfirm = (!(value === checkConfirm) && !!value);
  const showUnConfirmPassword = !isConfirm && isButtonClicked;

  const classEmailValid = classNames({
    errorInput: showInvalidEmail,
    input: !showInvalidEmail,
  });

  return (
    <div>
      <label className={classes.label}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className={classes[classEmailValid]}
        value={value}
        required={required}
        id={id}
        autoComplete={autoComplete}
      />
      <p className={classes.errorMessage}>
        {showInvalidEmail && errorEmailMessage}
      </p>
      <p className={classes.errorMessage}>
        {showUnConfirmPassword && errorPasswordMessage}
      </p>
    </div>
  );
};
export default InputField;