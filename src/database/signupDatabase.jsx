import React, { useState } from "react";
import Firebase from "./config";
import { useHistory } from "react-router-dom";

const CreateAccount = (props) => {
  const email = props.email;
  const password = props.password;
  const userName = props.userName;
  const history = useHistory();
  const [error, setError] = useState("");

  const informationDataAccount = {
    uid: email,
    userName: userName,
  };

  const errorCreateAccount = (error) => {
    setError(error);
  };

  const successCreateAccount = (event) => {
    history.push("/home");
  };

  Firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(successCreateAccount)
    .catch(errorCreateAccount);

  return <p>error</p>;
};

export default CreateAccount;
