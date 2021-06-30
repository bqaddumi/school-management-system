import schoolLogo from "../../images/educationSchoolLogo.jpg";
import classes from "./mainNavbar.module.css";
import Firebase from "../../database/config";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { authActions } from "../../store/Action";

const MainNavbar = () => {
  const database = Firebase.firestore();
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const [showResultWarning, setShowResultWarning] = useState(false);
  const [showResultsSuccess, setShowResultsSuccess] = useState(true);
  const [getInformation, setInformation] = useState('');

  Firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      database.collection("users")
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

  useEffect(() => {
    {
      isAuth
        ? setTimeout(function () {
          setShowResultsSuccess(!showResultsSuccess);
        }, 1000)
        : setTimeout(function () {
          setShowResultWarning(!showResultWarning);
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
      {isAuth ? (
        showResultsSuccess ? (
          <div className={classes.success}>
            <p>Success login</p>
          </div>
        ) : (
          ""
        )
      ) : showResultWarning ? (
        <div className={classes.warning}>
          <p>failed login</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MainNavbar;