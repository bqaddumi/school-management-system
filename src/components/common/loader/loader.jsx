import React from "react";
import classes from './loader.module.scss';

const Loader = ({ type }) => {
    return <div className={classes[type]}></div>;
}

export default Loader;