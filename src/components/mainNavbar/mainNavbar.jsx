import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import UsersSettings from "./usersSettings/usersSettings";
import Firebase from "../../database/config";
import classes from "./mainNavbar.module.css";
import schoolLogo from "../../images/educationSchoolLogo.jpg";
import TeachersSettings from "./teachersSettings/teachersSettings";

const MainNavbar = () => {
  const database = Firebase.firestore();
  const dispatch = useDispatch();
  const history = useHistory();
  const usersObject = useSelector((state) => state.auth.userInformation);
  const userInformation = JSON.parse(usersObject ? usersObject : false);

  useEffect(() => {
    database
      .collection("usersType")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          dispatch(authActions.setUserRole(doc.data()));
        })
      });
  }, [dispatch, database]);

  const logoutUser = () => {
    dispatch(authActions.logout('userInformation'));
    history.push("/home");
  };

  const logoutHandler = () => {
    Firebase.auth().signOut().then(logoutUser());
  };

  const navItems = [
    (
      (userInformation.role === 'Administration')
        ?
        <UsersSettings userName={userInformation.userName} />
        :
        (userInformation.role === 'Teachers')
          ?
          <TeachersSettings userName={userInformation.userName} />
          :
          <div className={classes.link}>
            {userInformation.userName}
          </div>
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
      <NavLink to="#" className={classes.link}>
        <div className={classes.logo}>Home</div>
      </NavLink>
      <ul className={classes.navContainerList}>
        {userInformation ? (
          <>
            {navItems.map((item, index) => {
              return (
                <li className={classes.navList} key={index}>
                  {item}
                </li>
              );
            })}
          </>
        ) :
          <>
            {navItemsLink.map((item, index) => {
              return (
                <li className={classes.navList} key={index}>
                  {item}
                </li>
              );
            })}
          </>
        }
      </ul>
    </div>
  );
};

export default MainNavbar;
