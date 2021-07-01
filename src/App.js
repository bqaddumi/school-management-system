import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import MainNavbar from "./components/mainNavbar";
import HomePage from "./pages/home/homePage";
import SignupPageForm from "./pages/signUp/signupPageForm";
import SigninPageForm from "./pages/signIn/signinPageForm";
import Loader from './components/common/loader/loader';
import classes from "./App.module.css";

const App = () => {
  const isLoading = useSelector((state) => state.loader.isLoading);
  return (
    <main className={classes.mainContainer}>
      <MainNavbar />
      <div className={classes.routsContainer}>
      {isLoading && <div className={classes.loaderContainer}><Loader /></div>}
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
      </div>
    </main>
  );
};

export default App;
