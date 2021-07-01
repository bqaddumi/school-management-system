import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { emailRegex } from "../../consts/RegEx";
import { authActions } from "../../store/Action";
import Firebase from "../../database/config";
import InputField from "../../components/common/InputField";
import classes from "./signinPageForm.module.css";

const SigninForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const onEmailChanged = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChanged = (event) => {
    setPassword(event.target.value);
  };

  const errorLogin = (error) => {
    setError(error.message);
    setTimeout(() => {
      setError(false);
    }, 1000);
    setIsLoading(false);
  };

  const successLogin = () => {
    setIsLoading(false);
    dispatch(authActions.login());
    history.push("/home");
  };

  const onSigninHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(successLogin)
      .catch(errorLogin);
  };

  return (
    <>
      {!isLoading && error && (
        <div className={classes.warning}>
          <p>{error}</p>
        </div>
      )}
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
            <button className={classes.signinButton}>Login</button>
          </div>
        </form>
        {isLoading && <p>loading..</p>}
      </section>
    </>
  );
};

export default SigninForm;
