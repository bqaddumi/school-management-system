import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import Firebase from "../database/config";
import classes from "./mainNavbar.module.css";
import schoolLogo from "../images/educationSchoolLogo.jpg";

const MainNavbar = () => {
  const database = Firebase.firestore();
  const dispatch = useDispatch();
  const history = useHistory();
  const userToken = useSelector((state) => state.auth.userToken);
  const [getInformation, setInformation] = useState();
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
    dispatch(authActions.logout('userToken'));
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

  // useEffect(() => {
  //   setTimeout(() => {
  //     setShowMsg(!user);
  //   }, 1000);
  // }, [user]);

  return (
    <>
      <div className={classes.header}>
        <NavLink to="/home" className={classes.link}>
          <div className={classes.logo}>Home</div>
        </NavLink>
        <ul className={classes.navContainerList}>
          {userToken ? (
            <>
              {navItems.map((item, index) => {
                return <li className={classes.navList} key={index}>{item}</li>;
              })}
            </>
          ) : (
            <>
              {navItemsLink.map((item, index) => {
                return <li className={classes.navList} key={index}>{item}</li>;
              })}
            </>
          )}
        </ul>
      </div>
      {userToken && showMsg && (
        <div className={classes.success}>
          <p> Success Signin</p>
        </div>
      )}
    </>
  );
};

export default MainNavbar;
