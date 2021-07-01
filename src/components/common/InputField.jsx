import React from "react";
import classNames from 'classnames';

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
  const isValidated = !(!!value?.match(valdationRegex)) && (value!=='');
  const isConfirm = value === checkConfirm;

  let classEmailValid = classNames({
    errorInput: isValidated,
    input: !isValidated},
  );
  
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
      />
      <p className={classes.errorMessage}>
        {isValidated && errorEmailMessage }
      </p>
      <p className={classes.errorMessage}>
        {(!isConfirm && value !== "") && errorPasswordMessage }
      </p>
    </div>
  );
};
export default InputField;