import { useState } from "react";
import { emailRegex } from "../../consts/RegEx";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import InputField from "../../components/common/InputField";
import classes from "./signinPageForm.module.css";
import { authActions } from "../../store/Action";
import Firebase from "../../database/config";

const SigninForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading,setIsLoading]=useState(false);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const history = useHistory();

  const onEmailChanged = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChanged = (event) => {
    setPassword(event.target.value);
  };

  const errorLogin = (error) => {
    setIsLoading(false);
    setError(error.message);
  };

  const successLogin = () => {
    setIsLoading(false);
    dispatch(authActions.login());
    setTimeout (()=>{history.push("/home")},500);
  };

  const onSigninHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(successLogin)
      .catch(errorLogin);
  };

  return (
    <>
    {(!isLoading&&isAuth)&&<div className={classes.success}>
      <p>success</p>
      </div>}
    <section className={classes.header}>
      <form onSubmit={onSigninHandler}>
        <InputField
          label="Email"
          onChange={onEmailChanged}
          type="email"
          placeholder="userName@gmail.com"
          valdationRegex={emailRegex}
          value={email}
          errorEmailMessage={"It should be an e-mail"}
          required={true}
        />
        <InputField
          label="Password"
          onChange={onPasswordChanged}
          type="password"
          placeholder="password"
          value={password}
          required={true}
        />
        <div className={classes.actions}>
          <button className={classes.signinButton}>Sign In</button>
        </div>
      </form>
      {isLoading && <p>loading..</p>}
    </section>
    </>
  );
};

export default SigninForm;
