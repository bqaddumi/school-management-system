import React from "react";
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
  } = props;
  const isValidated = !!value?.match(valdationRegex);
  const isConfirm = value === checkConfirm;
  return (
    <div>
      <label className={classes.label}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className={`${
          !isValidated && value != "" ? classes.errorInput : classes.input
        }`}
        value={value}
        required={required}
        id={id}
      />
      <p className={classes.errorMessage}>
        {!isValidated && value != "" ? errorEmailMessage : ""}
      </p>
      <p className={classes.errorMessage}>
        {!isConfirm && value != "" ? errorPasswordMessage : ""}
      </p>
    </div>
  );
};
export default InputField;