import React from "react";
import { useSelector } from "react-redux";
import student from "../../images/student.jpg";
import BackgroundLogo from "../../components/common/backgroundLogo/backgroundLogo";
import Footer from "../../components/common/footer/footer";
import classes from "./studentsPage.module.scss";

const Student = () => {
  const usersObject = useSelector((state) => state.auth.userInformation);
  const userInformation = JSON.parse(usersObject ? usersObject : false);
  const studentName =
    userInformation.userName.charAt(0).toUpperCase() +
    userInformation.userName.slice(1);
  const studentEmail = userInformation.uid;

  return (
    <div>
      <BackgroundLogo
        title={"Hello Student " + studentName}
        major={studentEmail}
      />
      <div className={classes.sectionContainer}>
        <img
          src={student}
          alt="Logo Student Page"
          className={classes.imageStudent}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Student;
