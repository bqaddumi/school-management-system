import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { emailRegex } from "../../consts/RegEx";
import Firebase from "../../database/config";
import InputField from "../../components/common/InputField";
import classes from "./signupPageForm.module.css";

const SignupPageForm = () => {
  const database = Firebase.firestore();
  const history = useHistory();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const informationDataAccount = {
    uid: email,
    userName: name,
  };

  const errorCreateAccount = (error) => {
    setError(error.message);
    setTimeout(() => {
      setError(false);
    }, 1000);
    setIsLoading(false);
  };

  const successCreateAccountInformation = () => {
    setIsLoading(false);
    history.push("/home");
  };

  const errorCreateAccountInformation = (error) => {
    setError(error);
  };

  const successCreateAccount = () => {
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
      setIsLoading(true);
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
      {!isLoading && error && (
        <div className={classes.warning}>
          <p>{error}</p>
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
          />
          <div className={classes.actions}>
            <button className={classes.signupButton}>Sign Up</button>
          </div>
        </form>
        {isLoading && <p>loading..</p>}
      </section>
    </>
  );
};

export default SignupPageForm;
