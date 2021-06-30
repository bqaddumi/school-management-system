import schoolLogo from "../../images/educationSchoolLogo.jpg";
import classes from "./mainNavbar.module.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SignoutAccount from "../../database/signoutDatabase";

const MainNavbar = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [showResultsSuccess, setShowResultsSuccess] = useState(true);

  const logoutHandler = () => {
    setIsButtonClicked(true);
    {
      setTimeout(function () {
        setIsButtonClicked(false);
      }, 500);
    }
  };

  const navItems = [
    <div>userName</div>,
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

      {isAuth && showResultsSuccess && (
        <div className={classes.success}>
          <p>Success login</p>
        </div>
      )}
      {isButtonClicked ? (
        <div className={classes.errorMessage}>
          <SignoutAccount />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MainNavbar;
