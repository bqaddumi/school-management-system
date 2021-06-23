import { Fragment } from "react";
import classes from '../homePageForm.module.css';
import logo from '../../../images/educationSchoolLogo.jpg';

const homePageForm = () => {
    return(
        <Fragment>
            <img src={logo} alt="Logo" className={classes.image}/>
        </Fragment>
    );
};

export default homePageForm;