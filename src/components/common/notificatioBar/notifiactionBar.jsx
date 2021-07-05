import React from "react";
import classes from "./notifiactionBar.module.css";

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
