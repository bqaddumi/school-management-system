import schoolLogo from "../images/educationSchoolLogo.jpg";
import Firebase from "../database/config";
import classes from "./mainNavbar.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/Action";

const MainNavbar = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const database = Firebase.firestore();
  const dispatch = useDispatch();
  const history = useHistory();
  const [getInformation, setInformation] = useState("");

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

  const logoutHandler = () => {
    Firebase.auth().signOut();
    dispatch(authActions.logout());
    history.push("/home");
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
      Login
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
  );
};

export default MainNavbar;
