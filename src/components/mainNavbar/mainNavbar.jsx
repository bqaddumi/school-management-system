import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { MdHome } from "react-icons/md";
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import TeachersSettings from "./teachersSettings/teachersSettings";
import { authActions } from "../../store/auth";
import AdminSetting from "./adminSetting/adminSetting";
import Firebase from "../../database/config";
import schoolLogo from "../../images/profileSchoolLogo.jpg";
import classes from "./mainNavbar.module.scss";

const MainNavbar = () => {
  const database = Firebase.firestore();
  const dispatch = useDispatch();
  const history = useHistory();
  const [navbar, setNavbar] = useState(false);
  const usersObject = useSelector((state) => state.auth.userInformation);
  const userInformation = JSON.parse(usersObject ? usersObject : false);

  useEffect(() => {
    database
      .collection("usersType")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          dispatch(authActions.setUserRole(doc.data()));
        });
      });

    database
      .collection("majorTypes")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          dispatch(authActions.setTeachersMajor(doc.data()));
        });
      });
  }, [dispatch, database]);

  const logoutUser = () => {
    dispatch(authActions.logout("userInformation"));
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
    userInformation.role === "Administration" ? (
      <AdminSetting userName={userInformation.userName} navLink={navLink} />
    ) : userInformation.role === "Teachers" ? (
      <TeachersSettings userName={userInformation.userName} navLink={navLink} />
    ) : (
      <div className={classes[navLink]}>{userInformation.userName}</div>
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className={classes[headerNavbar]}>
      <NavLink to="/home" className={classes[navLink]}>
        <MdHome className={classes.logo} />
      </NavLink>
     
    
      <div
     
    >
        <MenuIcon className={classes.menuIcon} onClick={(event)=>{}}/>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu List
      </Button>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
      >
        <MenuItem onClick={handleClose}>My Account</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
   

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
