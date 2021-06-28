import classes from './homePage.module.css';
import logo from '../../images/educationSchoolLogo.jpg';

const HomePage = () => {
    return (
        <div className={classes.homePageContainer}>
            <img src={logo} alt="Logo Home Page" className={classes.image} />
        </div>
    );
};

export default HomePage;