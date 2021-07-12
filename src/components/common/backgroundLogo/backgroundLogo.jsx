import React from "react";
import schoolLogo from "../../../images/schoolLogo.jpg";
import classes from "./backgroundLogo.module.css";

const BackgroundLogo = () => {
  return (
    <>
      <div className={classes.banner}>
        <img className={classes.schoolLogo} src={schoolLogo} />
      </div>
      <div className={classes.sitename}>WIX School</div>
    </>
  );
};
export default BackgroundLogo;
