import React from 'react';
import teachers from "../../images/teacher.png";
import classes from "./teachersPage.module.css";

const Teachers = () => {
    return (
        <div>
            <h1>Hello Teachers</h1>
            <div className={classes.teachersPageContainer}>
                <img src={teachers} alt="Logo Teacher Page" className={classes.image} />
            </div>
        </div>
    );
};

export default Teachers;