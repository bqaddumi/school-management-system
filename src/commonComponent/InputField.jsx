import React from "react";
import classes from "./InputField.module.css";

const InputField = (props) => {
  const {
    className,
    label,
    onChange,
    type,
    placeholder,
    value,
    valdationRegex,
    errorMessage,
    required,
    id,
  } = props;
  const isValidated = !!(value?.match(valdationRegex) || "");

  return (
    <form>
      <div>
        <label className={classes.label}>{label}</label>
        <input
          className={classes.input}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          className={`${!isValidated ? classes.errorInput : ""}`}
          value={value}
          required={required}
          id={id}
        />
        {<p>{!isValidated ? errorMessage : ""}</p>}
      </div>
    </form>
  );
};
export default InputField;
