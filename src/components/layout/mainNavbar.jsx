import logo from "../../images/educationSchoolLogo.jpg";
import classes from "./mainNavbar.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { authActions } from "../../store/Action";
import { useSelector, useDispatch } from "react-redux";

const MainNavbar = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const [showResults, setShowResults] = useState(true);
  const [showResultsSuccess, setShowResultsSuccess] = useState(true);
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.push("/home");
  };

  const navItems = [
    <div>userName</div>,
    <img src={logo} alt="Logo" className={classes.image} />,
    <button className={classes.buttonLogout} onClick={logoutHandler}>
      Logout
    </button>,
  ];
  const navItemsLink = [
    <NavLink className={classes.link} to="/login">
      Login
    </NavLink>,
    <NavLink className={classes.link} to="/signup">
      Signup
    </NavLink>,
  ];

  useEffect(() => {
    {
      !isAuth &&
        setTimeout(function () {
          setShowResults(!showResults);
        }, 1000);
    }
    {
      isAuth &&
        setTimeout(function () {
          setShowResultsSuccess(!showResultsSuccess);
        }, 1000);
    }
  }, [isAuth]);

  return (
    <>
      <div className={classes.header}>
        <NavLink to="/home" className={classes.link}>
          <div className={classes.logo}>Home</div>
        </NavLink>
        <ul className={classes.navContainerList}>
          {isAuth && (
            <>
              {navItems.map((item) => {
                return <li className={classes.navList}>{item}</li>;
              })}
            </>
          )}
          {!isAuth && (
            <>
              {navItemsLink.map((item) => {
                return <li className={classes.navList}>{item}</li>;
              })}
            </>
          )}
        </ul>
      </div>
      {isAuth && showResultsSuccess && (
        <div className={classes.success}>
          <p>Success login</p>
        </div>
      )}
      {!isAuth && showResults && (
        <div className={classes.warning} id="mydiv">
          <p>failed login</p>
        </div>
      )}
    </>
  );
};

export default MainNavbar;
