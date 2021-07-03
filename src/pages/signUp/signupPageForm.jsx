import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { emailRegex } from "../../consts/RegEx";
import { loadingActions } from "../../store/loading";
import { errorMessageActions } from "../../store/errorMessage";
import Firebase from "../../database/config";
import InputField from "../../components/common/InputField";
import classes from "./signupPageForm.module.css";

const SignupPageForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const database = Firebase.firestore();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const isError = useSelector((state) => state.error.isError);
  const isLoading = useSelector((state) => state.loader.isLoading);

  const informationDataAccount = {
    uid: email,
    userName: name,
  };

  const errorCreateAccount = (error) => {
    dispatch(loadingActions.setIsLoading(false));
    dispatch(errorMessageActions.errorMsg(error.message));
    setTimeout(() => {
      dispatch(errorMessageActions.errorMsg(''));
    }, 1000);
  };

  const successCreateAccountInformation = () => {
    history.push("/home");
  };

  const errorCreateAccountInformation = (error) => {
    dispatch(errorMessageActions.errorMsg(error.message));
  };

  const successCreateAccount = () => {
    dispatch(loadingActions.setIsLoading(false));
    database
      .collection("users")
      .doc(informationDataAccount.uid.toString())
      .set(informationDataAccount)
      .then(successCreateAccountInformation)
      .catch(errorCreateAccountInformation);
  };

  const onSignupHandler = (event) => {
    event.preventDefault();
    setIsButtonClicked(true);
    if (password === confirmPassword) {
      dispatch(loadingActions.setIsLoading(true));
      Firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(successCreateAccount)
        .catch(errorCreateAccount);
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
    <>
      {!isLoading && isError && (
        <div className={classes.warning}>
          <p>{isError}</p>
        </div>
      )}
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
            isButtonClicked={isButtonClicked}
          />
          <InputField
            label="Pasword"
            onChange={onPasswordChanged}
            type="password"
            id="pasword"
            placeholder="password"
            value={password}
            required={true}
            autocomplete="on"
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
            isButtonClicked={isButtonClicked}
            autocomplete="on"
          />
          <div className={classes.actions}>
            <button className={classes.signupButton}>Sign Up</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default SignupPageForm;
