import classes from './homePage.module.css';
import logo from '../../images/educationSchoolLogo.jpg';

const homePage = () => {
    return (
        <div className={classes.homePageContainer}>
            <img src={logo} alt="Logo Home Page" className={classes.image} />
        </div>
    );
};

export default homePage;