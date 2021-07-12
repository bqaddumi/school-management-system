import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoute from "private-route-react";
import MainNavbar from "./components/mainNavbar";
import HomePage from "./pages/home/homePage";
import SignupPageForm from "./pages/signUp/signupPageForm";
import SigninPageForm from "./pages/signIn/signinPageForm";
import Loader from "./components/common/loader/loader";
import NotifiactionBar from "./components/common/notificatioBar/notifiactionBar";
import Users from "./pages/administration/userRole/users";
import AddUsers from "./pages/administration/addUsers/addUsers";
import classes from "./App.module.css";
import Teachers from "./pages/teachers/teachers";
import Students from "./pages/students/students";
import SchedulingTeachers from "./pages/schedulerTeachers/schedulingTeachers";

const App = () => {
  const isLoading = useSelector((state) => state.loader.isLoading);
  const userToken = useSelector((state) => state.auth.userToken);
  const currentUserRole = useSelector((state) => state.auth.currentUserRole);
  const userRole = useSelector((state) => state.auth.userRole);
  const toastType = useSelector((state) => state.toast.type);
  const toastMessage = useSelector((state) => state.toast.message);
  const toastPosition = useSelector((state) => state.toast.position);

  const isAbleToAccessRouteAdmin = () => {
    if (userToken && currentUserRole === userRole.admin) return true;
    return false;
  };

  const isAbleToAccessRouteTeacher = () => {
    if (userToken && currentUserRole === userRole.teacher) return true;
    return false;
  };

  const isAbleToAccessRouteStudent = () => {
    if (userToken && currentUserRole === userRole.students) return true;
    return false;
  };

  return (
    <main className={classes.mainContainer}>
      <MainNavbar />
      {!isLoading && (
        <div className={classes.toastContainer}>
          <NotifiactionBar
            type={toastType}
            message={toastMessage}
            position={toastPosition}
          />
        </div>
      )}
      <div className={classes.routsContainer}>
        {isLoading && (
          <div className={classes.loaderContainer}>
            <Loader type="loader" />
          </div>
        )}

        <Switch>
          <PrivateRoute
            path={"/admin"}
            component={Users}
            isAbleToAccessRoute={isAbleToAccessRouteAdmin}
            redirectPath={"/"}
          />
          <PrivateRoute
            path={"/schedulingTeachers"}
            component={SchedulingTeachers}
            isAbleToAccessRoute={isAbleToAccessRouteAdmin}
            redirectPath={"/"}
          />
          <PrivateRoute
            path={"/addUser"}
            component={AddUsers}
            isAbleToAccessRoute={isAbleToAccessRouteAdmin}
            redirectPath={"/"}
          />
          <PrivateRoute
            path={"/teacher"}
            component={Teachers}
            isAbleToAccessRoute={isAbleToAccessRouteTeacher}
            redirectPath={"/teacher"}
          />
          <PrivateRoute
            path={"/student"}
            component={Students}
            isAbleToAccessRoute={isAbleToAccessRouteStudent}
            redirectPath={"/student"}
          />
          <Route path="/login">
            {userToken && <Redirect to="/home" />}
            {!userToken && <SigninPageForm />}
          </Route>
          <Route path="/signup">
            {userToken && <Redirect to="/home" />}
            {!userToken && <SignupPageForm />}
          </Route>
          <Route path="/home" exact>
            <HomePage />
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
