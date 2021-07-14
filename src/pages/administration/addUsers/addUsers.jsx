import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { MdPerson } from "react-icons/md";
import { MdLock } from "react-icons/md";
import { emailRegex } from "../../../consts/RegEx";
import { loadingActions } from "../../../store/loading";
import { toastActions } from "../../../store/notification";
import Firebase from "../../../database/config";
import InputField from "../../../components/common/InputField";
import BackgroundLogo from "../../../components/common/backgroundLogo/backgroundLogo";
import Footer from "../../../components/common/footer/footer";
import classes from "./addUsers.module.css";

const AddUsers = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const database = Firebase.firestore();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const informationDataAccount = {
    uid: email,
    userName: name,
    role: "",
  };

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
      <BackgroundLogo title="Add Users" />
      <section className={classes.header}>
        <p className={classes.instruction}>Add A New User With Role</p>
        <form onSubmit={onSignupHandler}>
          <div className={classes.icons}>
            <MdPerson />
          </div>
          <InputField
            label="User name"
            onChange={onNameChanged}
            type="text"
            id="userName"
            placeholder="userName"
            value={name}
            required={true}
          />
          <div className={classes.icons}>
            <MdPerson />
          </div>
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
          <div className={classes.icons}>
            <MdLock />
          </div>
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
          <div className={classes.icons}>
            <MdLock />
          </div>
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
          <label className={classes.label}> User Role</label>
          <select required className={classes.select} placeholder>
            <option></option>
            <option value="Students">Students</option>
            <option value="Teachers">Teachers</option>
            <option value="Administration">Administration</option>
          </select>
          <div className={classes.actions}>
            <button className={classes.signupButton}>Sign Up</button>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default AddUsers;
