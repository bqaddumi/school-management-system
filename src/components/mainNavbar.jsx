import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import Loader from "../components/common/loader/loader"
import Firebase from "../database/config";
import classes from "./mainNavbar.module.css";
import schoolLogo from "../images/educationSchoolLogo.jpg";

const MainNavbar = () => {
  const database = Firebase.firestore();
  const dispatch = useDispatch();
  const history = useHistory();
  const userToken = useSelector((state) => state.auth.userToken);
  const userRole = useSelector((state) => state.auth.role);
  const [getUserName, setUserName] = useState("");
  const [loadingUserName, setLoadingUserName] = useState(false);

  useEffect(() => {
    if (userToken) {
      setLoadingUserName(true);
      database
        .collection("users")
        .doc(userToken)
        .get()
        .then((doc) => {
          setUserName(doc.data().userName);
          dispatch(authActions.setRole(doc.data().role));
          setLoadingUserName(false);
        }).catch(() => {
          setLoadingUserName(true);
        });
    } //eslint-disable-next-line
  }, [database, userToken]);

  const logoutUser = () => {
    dispatch(authActions.logout('userToken'));
    history.push("/home");
  };

  const logoutHandler = () => {
    Firebase.auth().signOut().then(logoutUser());
  };

  const navItems = [
    (loadingUserName ? <Loader type="loader-username" /> : <div>{getUserName}</div>),
    (
      (userRole === 'Adminstration')
      &&
      <NavLink className={classes.link} to="/Users">
        Adminstration
      </NavLink>
    ),
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

  return (
    <div className={classes.header}>
      <NavLink to="/home" className={classes.link}>
        <div className={classes.logo}>Home</div>
      </NavLink>
      <ul className={classes.navContainerList}>
        {userToken ? (
          <>
            {navItems.map((item, index) => {
              return (
                <li className={classes.navList} key={index}>
                  {item}
                </li>
              );
            })}
          </>
        ) : (
          <>
            {navItemsLink.map((item, index) => {
              return (
                <li className={classes.navList} key={index}>
                  {item}
                </li>
              );
            })}
          </>
        )}
      </ul>
    </div>
  );
};

export default MainNavbar;
