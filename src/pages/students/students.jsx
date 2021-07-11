import React from 'react';
import educationSchoolLogo from "../../images/educationSchoolLogo.jpg";
import classes from "./studentsPage.module.css";

const Students = () => {
    return (
        <div>
            <h1>Hello Students</h1>
            <div className={classes.studentsPageContainer}>
                <img src={educationSchoolLogo} alt="Logo Home Page" className={classes.image} />
            </div>
        </div>);
};

export default Students;