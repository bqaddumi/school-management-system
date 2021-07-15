import React from "react";
import classes from "./notifiactionBar.module.scss";

const NotifiactionBar = ({ type, message, position }) => {
  return (
    <div className={classes[position]}>
      <div className={classes[type]}>
        <p>{message}</p>
      </div>
    </div>
  );
};
export default NotifiactionBar;
