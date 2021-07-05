import React from "react";
import classes from './loader.module.css';

const Loader = (props) => {
    return <div className={classes[props.type]}></div>;
}

export default Loader;