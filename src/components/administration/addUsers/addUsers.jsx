import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { MdPerson } from "react-icons/md";
import { MdLock } from "react-icons/md";
import { emailRegex } from "../../../consts/RegEx";
import { loadingActions } from "../../../store/loading";
import { toastActions } from "../../../store/notification";
import Firebase from "../../../database/config";
import InputField from "../../../components/common/InputField/InputField";
import BackgroundLogo from "../../../components/common/backgroundLogo/backgroundLogo";
import Footer from "../../../components/common/footer/footer";
import classes from "./addUsers.module.scss";

const AddUsers = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const database = Firebase.firestore();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const [usersRole, setUsersRole] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const userRole = useSelector((state) => state.auth.userRole);

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
        role: usersRole,
        token: res.user.uid,
        major: major,
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

  const onMajorChanged = (event) => {
    setMajor(event.target.value);
  };

  const usersRoleHandler = (event) => {
    setUsersRole(event.target.value);
  };

  const options = [
    { value: userRole.students, label: userRole.students },
    { value: userRole.teacher, label: userRole.teacher },
    { value: userRole.admin, label: userRole.admin },
  ];

  return (
    <>
      <BackgroundLogo title="Add Users" />
      <section className={classes.tableSection}>
        <p className={classes.instruction}>Add A New User With Role</p>
        <form onSubmit={onSignupHandler}>
          <div className={classes.icons}>
            <MdPerson />
          </div>
          <InputField
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
          <Select
            onChange={usersRoleHandler}
            className={classes.selectUsersRole}
            options={options}
            placeholder={userRole.students}
          />

          {usersRole === "Teachers" && (
            <InputField
              label="Major"
              onChange={onMajorChanged}
              type="text"
              id="major"
              placeholder="major"
              value={major}
              required={true}
            />
          )}
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
