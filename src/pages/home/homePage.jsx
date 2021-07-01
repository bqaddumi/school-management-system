import classes from "./homePage.module.css";
import educationSchoolLogo from "../../images/educationSchoolLogo.jpg";

const HomePage = () => {
  return (
    <div className={classes.homePageContainer}>
      <img src={educationSchoolLogo} alt="Logo Home Page" className={classes.image} />
    </div>
  );
};

export default HomePage;
