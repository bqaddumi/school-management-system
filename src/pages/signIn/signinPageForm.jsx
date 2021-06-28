import React, { useState } from "react";
import InputField from "../../commonComponent/InputField";
import { emailRegex } from "../../consts/RegEx";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/Action";
import "./signinPageForm.css";

const SigninForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const onEmailChanged = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChanged = (event) => {
    setPassword(event.target.value);
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const submitHandler = (event) => {
    event.preventDefault();
    history.push("/home");
    dispatch(authActions.login());
  };

  return (
    <section className="auth">
      <form onSubmit={submitHandler}>
        <div>
          <InputField
            className="input"
            label="Email"
            onChange={onEmailChanged}
            type="email"
            placeholder="userName@gmail.com"
            valdationRegex={emailRegex}
            value={email}
            errorMessage={"It should be an e-mail"}
          />
          <InputField
            className="input"
            label="Password"
            onChange={onPasswordChanged}
            type="password"
            placeholder=""
            value={password}
          />
        </div>
        <div className="actions">
          <button>SignIN</button>
        </div>
      </form>
    </section>
  );
};

export default SigninForm;
