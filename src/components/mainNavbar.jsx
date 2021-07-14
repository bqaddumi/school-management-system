import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { MdHome } from "react-icons/md";
import { authActions } from "../store/auth";
import Loader from "../components/common/loader/loader";
import Firebase from "../database/config";
import schoolLogo from "../images/educationSchoolLogo.jpg";
import classes from "./mainNavbar.module.css";

const MainNavbar = () => {
  const database = Firebase.firestore();
  const dispatch = useDispatch();
  const history = useHistory();
  const userToken = useSelector((state) => state.auth.userToken);
  const currentUserRole = useSelector((state) => state.auth.currentUserRole);
  const [getUserName, setUserName] = useState("");
  const [loadingUserName, setLoadingUserName] = useState(false);
  const [navbar, setNavbar] = useState(false);

  useEffect(() => {
    if (userToken) {
      setLoadingUserName(true);
      database
        .collection("users")
        .doc(userToken)
        .get()
        .then((doc) => {
          setUserName(doc.data().userName);
          dispatch(authActions.setCurrentUserRole(doc.data().role));
          setLoadingUserName(false);
        })
        .catch(() => {
          setLoadingUserName(true);
        });
    }
  }, [database, userToken, dispatch]);

  useEffect(() => {
    database
      .collection("usersType")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          dispatch(authActions.setUserRole(doc.data()));
        });
      })
      .catch(() => {
      });
  }, [dispatch, database]);

  const logoutUser = () => {
    dispatch(authActions.logout("userToken"));
    history.push("/home");
  };

  const logoutHandler = () => {
    Firebase.auth().signOut().then(logoutUser());
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      setNavbar(true);
    } else setNavbar(false);
  });

  const headerNavbar = classNames({
    sticky: navbar,
    header: !navbar,
  });

  const navLink = classNames({
    stickyLink: navbar,
    link: !navbar,
  });

  const logoutButton = classNames({
    stickyLogout: navbar,
    logout: !navbar,
  });

  const navItems = [
    loadingUserName ? (
      <Loader type="loader-username" />
    ) : currentUserRole === "Administration" ? (
      <div className={classes.dropdown}>
        <div className={classes[navLink]}>{getUserName}</div>
        <div className={classes.dropdownContent}>
          <NavLink className={classes[navLink]} to="/addUser">
            Add Users {"  "}
          </NavLink>
          <NavLink className={classes[navLink]} to="/admin">
            {"  "}User Role{"  "}
          </NavLink>
          <NavLink className={classes[navLink]} to="/schedulingTeachers">
            Schedule Teacher{' '}
          </NavLink>
          <NavLink className={classes[navLink]} to="/about">
            About
          </NavLink>
          <div className={classes[navLink]}>Version 1.0</div>
        </div>
      </div>
    ) : (
      <div className={classes[navLink]}>{getUserName}</div>
    ),
    <img src={schoolLogo} alt="Logo" className={classes.image} />,
    <button className={classes[logoutButton]} onClick={logoutHandler}>
      Logout
    </button>,
  ];

  const navItemsLink = [
    <NavLink className={classes[navLink]} to="/login">
      Signin
    </NavLink>,
    <NavLink className={classes[navLink]} to="/signup">
      Signup
    </NavLink>,
  ];

  return (
    <>
      <div className={classes[headerNavbar]}>
        <NavLink to="/home" className={classes[navLink]}>
          <MdHome className={classes.logo} />
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
    </>
  );
};

export default MainNavbar;
