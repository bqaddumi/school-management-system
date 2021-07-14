import React from 'react';
import { NavLink } from "react-router-dom";
import classes from '../mainNavbar.module.css';

const UsersSettings = (props) => {
    return (
        <div className={classes.dropdown}>
            <div className={classes.link}>
                {props.userName}
            </div>
            <div className={classes.userSettingsDropDown}>
                <NavLink className={classes.link} to="/addUser">Add Users</NavLink>
                <NavLink className={classes.link} to="/admin">User Role</NavLink>
                <NavLink className={classes.link} to="/teacherSchedule">Scheduler Teacher</NavLink>
                <NavLink className={classes.link} to="/about">About</NavLink>
                <div className={classes.link}>Version 1.0</div>
            </div>
        </div>
    );
}

export default UsersSettings;