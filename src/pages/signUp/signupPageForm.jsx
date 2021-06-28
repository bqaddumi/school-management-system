import React, { useState } from "react";
import InputField from "../../commonComponent/InputField";
import { emailRegex } from "../../consts/RegEx";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/Action";
import classes from "./signupPageForm.module.css";

const SignupPageForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();
  const submitHandler = (event) => {
    event.preventDefault();
    history.push("/home");
    // dispatch(authActions.login());
  };
  const onEmailChanged = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChanged = (event) => {
    setPassword(event.target.value);
  };
  const onConfirmPasswordChanged = (event) => {
    setConfirmPassword(event.target.value);
  };
  const onNameChanged = (event) => {
    setName(event.target.value);
  };

  return (
    <section className={classes.auth}>
      <h1>Signup</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <InputField
            className="userName"
            label="UserName"
            onChange={onNameChanged}
            type="text"
            id="userName"
            placeholder="userName"
            value={name}
            required={true}
          />
          <InputField
            className="email_input"
            label="Email"
            onChange={onEmailChanged}
            type="email"
            placeholder="userName@gmail.com"
            valdationRegex={emailRegex}
            value={email}
            errorMessage={"It should be an e-mail"}
            required={true}
          />

          <InputField
            className="pasword"
            label="pasword"
            onChange={onPasswordChanged}
            type="password"
            id="pasword"
            placeholder="password"
            value={password}
            required={true}
          />
          <InputField
            className="confirmPassword"
            label="confirmPassword"
            onChange={onConfirmPasswordChanged}
            type="password"
            id="confirmPassword"
            placeholder="confirmPassword"
            value={confirmPassword}
            required={true}
          />
        </div>
        <div className={classes.actions}>
          <button>SignUp</button>
        </div>
      </form>
    </section>
  );
};

export default SignupPageForm;
