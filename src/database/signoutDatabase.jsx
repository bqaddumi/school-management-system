import React from "react";
import Firebase from "./config";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/Action";

const SignoutAccount = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const signoutHome = () => {
    dispatch(authActions.logout());
    history.push("/home");
  };

  const handleLogin = () => {
    Firebase.auth().signOut();
    signoutHome();
  };
  handleLogin();

  return <></>;
};

export default SignoutAccount;
