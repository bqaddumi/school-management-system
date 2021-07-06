import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { emailRegex } from "../../consts/RegEx";
import { authActions } from "../../store/auth";
import { loadingActions } from "../../store/loading";
import { toastActions } from "../../store/notification";
import Firebase from "../../database/config";
import InputField from "../../components/common/InputField";
import classes from "./signinPageForm.module.css";

const SigninForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const onEmailChanged = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChanged = (event) => {
    setPassword(event.target.value);
  };

  const errorLogin = (error) => {
    dispatch(
      toastActions.toast({
        type: "failure",
        message: error.message,
        position: "top",
      })
    );
    dispatch(loadingActions.setIsLoading(false));
  };

  const successLogin = (res) => {
    dispatch(
      toastActions.toast({
        type: "success",
        message: "LogIn Successfully",
        position: "top",
      })
    );
    dispatch(loadingActions.setIsLoading(false));
    dispatch(authActions.login(res.user.uid));
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
  );
};

export default SigninForm;
