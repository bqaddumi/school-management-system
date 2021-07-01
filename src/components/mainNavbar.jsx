import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/Action";
import Firebase from "../database/config";
import classes from "./mainNavbar.module.css";
import schoolLogo from "../images/educationSchoolLogo.jpg";

const MainNavbar = () => {
  const database = Firebase.firestore();
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const [getInformation, setInformation] = useState("");
  const [showMsg, setShowMsg] = useState(true);

  Firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      database
        .collection("users")
        .doc(user.email)
        .get()
        .then((doc) => {
          setInformation(doc.data().userName);
        });
    }
  });

  const logoutUser = () => {
    dispatch(authActions.logout());
    history.push("/home");
  };

  const logoutHandler = () => {
    Firebase.auth().signOut().then(logoutUser());
  };

  const navItems = [
    <div>{getInformation}</div>,
    <img src={schoolLogo} alt="Logo" className={classes.image} />,
    <button className={classes.buttonLogout} onClick={logoutHandler}>
      Logout
    </button>,
  ];

  const navItemsLink = [
    <NavLink className={classes.link} to="/login">
      Signin
    </NavLink>,
    <NavLink className={classes.link} to="/signup">
      Signup
    </NavLink>,
  ];

  useEffect(() => {
    setTimeout(() => {
      setShowMsg(!isAuth);
    }, 1000);
  }, [isAuth]);

  return (
    <>
      <div className={classes.header}>
        <NavLink to="/home" className={classes.link}>
          <div className={classes.logo}>Home</div>
        </NavLink>
        <ul className={classes.navContainerList}>
          {isAuth ? (
            <>
              {navItems.map((item) => {
                return <li className={classes.navList}>{item}</li>;
              })}
            </>
          ) : (
            <>
              {navItemsLink.map((item) => {
                return <li className={classes.navList}>{item}</li>;
              })}
            </>
          )}
        </ul>
      </div>
      {isAuth && showMsg && (
        <div className={classes.success}>
          <p> Success Signin</p>
        </div>
      )}
    </>
  );
};

export default MainNavbar;
