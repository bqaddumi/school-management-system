import { Route, Switch, Redirect } from "react-router-dom";
import MainNavbar from "./components/mainNavbar";
import HomePage from "./pages/home/homePage";
import SignupPageForm from "./pages/signUp/signupPageForm";
import SigninPageForm from "./pages/signIn/signinPageForm";
import classes from "./App.module.css";
require("dotenv").config();

const App = () => {
  return (
    <main className={classes.mainContainer}>
      <MainNavbar />
      <Switch>
        <Route path="/home" exact>
          <HomePage />
        </Route>
        <Route path="/login">
          <SigninPageForm />
        </Route>
        <Route path="/signup">
          <SignupPageForm />
        </Route>
        <Route path="*">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </main>
  );
};

export default App;
