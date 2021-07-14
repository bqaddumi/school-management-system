import React from "react";
import { NavLink } from "react-router-dom";
import classes from "../mainNavbar.module.css";

const UsersSettings = ({ navLink, userName }) => {
  return (
    <div className={classes.dropdown}>
      <div className={classes[navLink]}>{userName}</div>
      <div className={classes.userSettingsDropDown}>
        <NavLink className={classes[navLink]} to="/addUser">
          Add Users
        </NavLink>
        <NavLink className={classes[navLink]} to="/admin">
          User Role
        </NavLink>
        {/* <NavLink className={classes[navLink]} to="/teacherSchedule">
          Scheduler Teacher
        </NavLink>
        <NavLink className={classes[navLink]} to="/about">
          About
        </NavLink> */}
      </div>
    </div>
  );
};

export default UsersSettings;
