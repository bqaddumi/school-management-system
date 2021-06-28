import React, { useState } from "react";
import InputField from "../../commonComponent/InputField";
import { emailRegex } from "../../consts/RegEx";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/Action";
import classes from "./signinPageForm.module.css";

const SigninForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const onEmailChanged = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChanged = (event) => {
    setPassword(event.target.value);
  };

  const onSigninHandler = (event) => {
    event.preventDefault();
    history.push("/home");
    dispatch(authActions.login());
  };

  return (
    <section className={classes.header}>
      <form onSubmit={onSigninHandler}>
        <InputField
          label="Email"
          onChange={onEmailChanged}
          type="email"
          placeholder="userName@gmail.com"
          valdationRegex={emailRegex}
          value={email}
          errorEmailMessage={"It should be an e-mail"}
          required={true}
        />
        <InputField
          label="Password"
          onChange={onPasswordChanged}
          type="password"
          placeholder="password"
          value={password}
          required={true}
        />
        <div className={classes.actions}>
          <button className={classes.signinButton}>Sign In</button>
        </div>
      </form>
    </section>
  );
};

export default SigninForm;