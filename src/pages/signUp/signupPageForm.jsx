import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { emailRegex } from "../../consts/RegEx";
import { loadingActions } from "../../store/loading";
import { toastActions } from "../../store/notification";
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

  const errorCreateAccount = (error) => {
    dispatch(loadingActions.setIsLoading(false));
    dispatch(
      toastActions.toast({
        type: "failure",
        message: error.message,
        position: "top",
      })
    );
  };

  const successCreateAccountInformation = () => {
    dispatch(loadingActions.setIsLoading(false));
    dispatch(
      toastActions.toast({
        type: "success",
        message: "Signup Successfully",
        position: "top",
      })
    );
    history.push("/home");
  };

  const errorCreateAccountInformation = (error) => {
    dispatch(
      toastActions.toast({
        type: "failure",
        message: error.message,
        position: "top",
      })
    );
  };

  const createAccount = (res) => {
    database
      .collection("users")
      .doc(res.user.uid)
      .set({
        uid: email,
        userName: name,
        role: '',
        token: res.user.uid,
      })
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
        .then(createAccount)
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
            autoComplete="on"
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
            autoComplete="on"
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
