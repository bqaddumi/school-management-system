import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import MainNavbar from "./components/mainNavbar";
import HomePage from "./pages/home/homePage";
import SignupPageForm from "./pages/signUp/signupPageForm";
import SigninPageForm from "./pages/signIn/signinPageForm";
import Loader from "./components/common/loader/loader";
import NotifiactionBar from "./components/common/notificatioBar/notifiactionBar";
import classes from "./App.module.css";

const App = () => {
  const isLoading = useSelector((state) => state.loader.isLoading);
  const userToken = useSelector((state) => state.auth.userToken);
  const type = useSelector((state) => state.toast.type);
  const message = useSelector((state) => state.toast.message);
  const position = useSelector((state) => state.toast.position);

  return (
    <main className={classes.mainContainer}>
      <MainNavbar />
      {!isLoading && (
        <div className={classes.toastContainer} >
          <NotifiactionBar type={type} message={message} position={position} />
        </div>
      )}
      <div className={classes.routsContainer}>
        {isLoading && (
          <div className={classes.loaderContainer}>
            <Loader type="loader"/>
          </div>
        )}

        <Switch>
          <Route path="/home" exact>
            <HomePage />
          </Route>
          <Route path="/login">
            {userToken && <Redirect to="/home" />}
            {!userToken && <SigninPageForm />}
          </Route>
          <Route path="/signup">
            {userToken && <Redirect to="/home" />}
            {!userToken && <SignupPageForm />}
          </Route>
          <Route path="*">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </div>
    </main>
  );
};

export default App;
