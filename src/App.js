import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoute from 'private-route-react';
import MainNavbar from "./components/mainNavbar/mainNavbar";
import HomePage from "./pages/home/homePage";
import SignupPageForm from "./pages/signUp/signupPageForm";
import SigninPageForm from "./pages/signIn/signinPageForm";
import Loader from "./components/common/loader/loader";
import NotifiactionBar from "./components/common/notificatioBar/notifiactionBar";
import Users from "./components/administration/userRole/users";
import About from "./pages/about/about";
import AddUsers from "./components/administration/addUsers/addUsers";
import classes from "./App.module.css";
import Teachers from "./pages/teachers/teachers";
import Students from "./pages/students/students";
import TeacherSchedule from "./components/administration/teacherSchedule/teacherSchedule";
import ManageSchedule from "./components/teacherSchedule/manageSchedule/manageSchedule";
import ClassSchedule from "./components/teacherSchedule/classSchedule/classSchedule";

const App = () => {
  const isLoading = useSelector((state) => state.loader.isLoading);
  const userRole = useSelector((state) => state.auth.userRole);
  const type = useSelector((state) => state.toast.type);
  const message = useSelector((state) => state.toast.message);
  const position = useSelector((state) => state.toast.position);
  const usersObject = useSelector((state) => state.auth.userInformation);
  const userInformation = JSON.parse(usersObject ? usersObject : false);

  const isAbleToAccessRouteAdmin = () => {
    if (userInformation && userInformation.role === userRole.admin) return true;
    return false;
  };

  const isAbleToAccessRouteTeacher = () => {
    if (userInformation && userInformation.role === userRole.teacher) return true;
    return false;
  };

  const isAbleToAccessRouteStudent = () => {
    if (userInformation && userInformation.role === userRole.students) return true;
    return false;
  };

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
            <Loader type="loader" />
          </div>
        )}

        <Switch>
          <PrivateRoute
            path={'/admin'}
            component={Users}
            isAbleToAccessRoute={isAbleToAccessRouteAdmin}
            redirectPath={'/'}
          />
          <PrivateRoute
            path={'/teacherSchedule'}
            component={TeacherSchedule}
            isAbleToAccessRoute={isAbleToAccessRouteAdmin}
            redirectPath={'/'}
          />
          <PrivateRoute
            path={'/manageSchedule'}
            component={ManageSchedule}
            isAbleToAccessRoute={isAbleToAccessRouteTeacher}
            redirectPath={'/'}
          />
          <PrivateRoute
            path={'/classSchedule'}
            component={ClassSchedule}
            isAbleToAccessRoute={isAbleToAccessRouteTeacher}
            redirectPath={'/'}
          />
          <PrivateRoute
            path={'/addUser'}
            component={AddUsers}
            isAbleToAccessRoute={isAbleToAccessRouteAdmin}
            redirectPath={'/'}
          />
          <PrivateRoute
            path={'/teacher'}
            component={Teachers}
            isAbleToAccessRoute={isAbleToAccessRouteTeacher}
            redirectPath={'/teacher'}
          />
          <PrivateRoute
            path={'/student'}
            component={Students}
            isAbleToAccessRoute={isAbleToAccessRouteStudent}
            redirectPath={'/student'}
          />
          <Route path="/login">
            {userInformation && <Redirect to="/home" />}
            {!userInformation && <SigninPageForm />}
          </Route>
          <Route path="/signup">
            {userInformation && <Redirect to="/home" />}
            {!userInformation && <SignupPageForm />}
          </Route>
          <Route path="/home" exact>
            <HomePage />
          </Route>
          <Route path="/about" exact>
            <About />
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
