import React from "react";
import classes from './loader.module.css';

const Loader = ({ type }) => {
    return <div className={classes[type]}></div>;
}

export default Loader;