import { useState } from "react";
import { emailRegex } from "../../consts/RegEx";
import InputField from "../../commonComponent/InputField";
import classes from "./signinPageForm.module.css";
import LoginAccount from "../../database/signinDatabase";

const SigninForm = () => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onEmailChanged = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChanged = (event) => {
    setPassword(event.target.value);
  };

  const onSigninHandler = (event) => {
    event.preventDefault();
    setIsButtonClicked(true);
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
      {isButtonClicked ? (
        <div>
          <LoginAccount email={email} password={password} />
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default SigninForm;