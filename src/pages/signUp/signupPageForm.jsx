import React, { useState } from "react";
import InputField from "../../commonComponent/InputField";
import { emailRegex } from "../../consts/RegEx";
import { useHistory } from "react-router-dom";
import classes from "./signupPageForm.module.css";
import CreateAccount from "../../database/signupDatabase";

const SignupPageForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const onSignupHandler = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      setIsButtonClicked(true);
    }
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
    <section className={classes.header}>
      <form onSubmit={onSignupHandler}>
        <InputField
          label="User name"
          onChange={onNameChanged}
          type="text"
          id="userName"
          placeholder="userName"
          value={name}
          required={true}
        />
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
          label="Pasword"
          onChange={onPasswordChanged}
          type="password"
          id="pasword"
          placeholder="password"
          value={password}
          required={true}
        />
        <InputField
          label="Confirm password"
          onChange={onConfirmPasswordChanged}
          type="password"
          id="confirmPassword"
          placeholder="confirmPassword"
          value={confirmPassword}
          errorPasswordMessage={"It should be match password"}
          required={true}
          checkConfirm={password}
        />
        <div className={classes.actions}>
          <button className={classes.signupButton}>Sign Up</button>
        </div>
      </form>
      {isButtonClicked ? (
        <>
          <CreateAccount userName={name} email={email} password={password} />
        </>
      ) : (
        ""
      )}
    </section>
  );
};

export default SignupPageForm;
