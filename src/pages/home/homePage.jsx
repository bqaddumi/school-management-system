import { useSelector } from "react-redux";
import Loader from "../../components/common/loader/loader";
import classes from "./homePage.module.css";
import educationSchoolLogo from "../../images/educationSchoolLogo.jpg";
import teachers from "../../images/teacher.png";

const HomePage = () => {
  const userRole = useSelector((state) => state.auth.role);
  const isTeacher = (userRole === "Teachers");
  const isStudent = (userRole === "Students");
  const isLoading = useSelector((state) => state.loader.isLoading);

  return (
    <>
      {isLoading && (
        <div className={classes.loaderContainer}>
          <Loader type="loader" />
        </div>
      )}
      {isStudent &&
        <div>
          <h1>Hello Students</h1>
          <div className={classes.homePageContainer}>
            <img src={educationSchoolLogo} alt="Logo Home Page" className={classes.image} />
          </div>
        </div>
      }
      {isTeacher &&
        <div>
          <h1>Hello Teachers</h1>
          <div className={classes.homePageContainer}>
            <img src={teachers} alt="Logo Teacher Page" className={classes.image} />
          </div>
        </div>
      }
    </>
  );
};

export default HomePage;
