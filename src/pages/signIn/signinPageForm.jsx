import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { emailRegex } from "../../consts/RegEx";
import { authActions } from "../../store/auth";
import { loadingActions } from "../../store/loading";
import { errorMessageActions } from "../../store/errorMessage";
import Firebase from "../../database/config";
import InputField from "../../components/common/InputField";
import classes from "./signinPageForm.module.css";

const SigninForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const isError = useSelector((state) => state.error.isError);
  const isLoading = useSelector((state) => state.loader.isLoading);

  const onEmailChanged = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChanged = (event) => {
    setPassword(event.target.value);
  };

  const errorLogin = (error) => {
    dispatch(errorMessageActions.errorMsg(error.message));
    setTimeout(() => {
      dispatch(errorMessageActions.errorMsg(false));
    }, 1000);
    dispatch(loadingActions.setIsLoading(false));
  };

  const successLogin = () => {
    dispatch(loadingActions.setIsLoading(false));
    dispatch(authActions.login());
    history.push("/home");
  };

  const onSigninHandler = (event) => {
    event.preventDefault();
    dispatch(loadingActions.setIsLoading(true));
    setIsButtonClicked(true);
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(successLogin)
      .catch(errorLogin);
  };

  return (
    <>
      {!isLoading && isError && (
        <div className={classes.warning}>
          <p>{isError}</p>
        </div>
      )}
      <section className={classes.singInPageSection}>
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
            isButtonClicked={isButtonClicked}
          />
          <InputField
            label="Password"
            onChange={onPasswordChanged}
            type="password"
            placeholder="password"
            value={password}
            required={true}
            autoComplete="on"
          />
          <div className={classes.actions}>
            <button className={classes.signinButton}>Login</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default SigninForm;
