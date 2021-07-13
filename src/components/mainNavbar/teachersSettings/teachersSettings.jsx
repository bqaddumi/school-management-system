import React from 'react';
import { NavLink } from "react-router-dom";
import classes from '../mainNavbar.module.css';

const TeachersSettings = (props) => {
    return (
        <div className={classes.dropdown}>
            <div className={classes.link}>
                {props.userName}
            </div>
            <div className={classes.userSettingsDropDown}>
                <NavLink className={classes.link} to="/manageSchedule">Manage Schedule</NavLink>
                <NavLink className={classes.link} to="/about">About</NavLink>
                <div className={classes.link}>Version 1.0</div>
            </div>
        </div>
    );
}

export default TeachersSettings;