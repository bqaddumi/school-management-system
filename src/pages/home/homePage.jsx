import { useSelector } from "react-redux";
import Loader from "../../components/common/loader/loader";
import classes from "./homePage.module.css";
import Students from "../students/students";
import Teachers from "../teachers/teachers";

const HomePage = () => {
  const currentUserRole = useSelector((state) => state.auth.currentUserRole);
  const isTeacher = (currentUserRole === "Teachers");
  const isStudent = (currentUserRole === "Students");
  const isLoading = useSelector((state) => state.loader.isLoading);

  return (
    <>
      {isLoading && (
        <div className={classes.loaderContainer}>
          <Loader type="loader" />
        </div>
      )}
    </>
  );
};

export default HomePage;
