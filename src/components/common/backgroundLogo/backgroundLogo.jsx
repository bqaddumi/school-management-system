import React from "react";
import schoolLogo from "../../../images/schoolLogo.jpg";
import classes from "./backgroundLogo.module.scss";

const BackgroundLogo = ({ title }) => {
  return (
    <>
      <div className={classes.banner}>
        <img
          className={classes.schoolLogo}
          src={schoolLogo}
          alt="School Logo"
        />
      </div>
      <div className={classes.sitename}>{title}</div>
    </>
  );
};

export default BackgroundLogo;
