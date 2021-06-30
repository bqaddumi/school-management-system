import { useState } from "react";
import { emailRegex } from "../../consts/RegEx";
import InputField from "../../commonComponent/InputField";
import classes from "./signupPageForm.module.css";
import CreateAccount from '../../database/signupDatabase';

const SignupPageForm = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

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
          label="UserName"
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
          label="pasword"
          onChange={onPasswordChanged}
          type="password"
          id="pasword"
          placeholder="password"
          value={password}
          required={true}
        />
        <InputField
          label="confirmPassword"
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
          <CreateAccount email={email} password={password} name={name} />
        </>
      ) : (
        ""
      )}

    </section>
  );
};

export default SignupPageForm;