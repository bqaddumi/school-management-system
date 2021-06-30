import React, { useState } from "react";
import Firebase from "./config";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/Action";

const LoginAccount = (props) => {
  const [error, setError] = useState();
  const { email, password } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  const errorLogin = (error) => {
    setError(error.message);
  };

  const successLogin = (event) => {
    setError("");
    history.push("/home");
    dispatch(authActions.login());
  };

  const handleLogin = () => {
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(successLogin)
      .catch(errorLogin);
  };
  handleLogin();

  return <p>{error}</p>;
};

export default LoginAccount;
