import React from "react";
import schoolLogo from "../../../images/schoolLogo.jpg";
import classes from "./backgroundLogo.module.scss";

const BackgroundLogo = ({ title, major }) => {
  return (
    <>
      <div className={classes.banner}>
        <img
          className={classes.schoolLogo}
          src={schoolLogo}
          alt="School Logo"
        />
      </div>
      <div className={classes.sectionInformation}>
        <p>{title}</p>
        <p> {major}</p>
      </div>
    </>
  );
};

export default BackgroundLogo;
