import React, { useState } from "react";
import Firebase from "./config";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/Action";
import classes from './invalidAccount.module.css';

const LoginAccount = (props) => {
  const [error, setError] = useState('');
  const { email, password } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  
  const errorLogin = (error) => {
    setError(error);
  };

  const successLogin = () => {
    dispatch(authActions.login());
    history.push("/home");
  };

  const handleLogin = () => {
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(successLogin)
      .catch(errorLogin);
  };
  { handleLogin() }

  return (
    <p className={classes.errorMessage}>{error}</p>
  );
};

export default LoginAccount;