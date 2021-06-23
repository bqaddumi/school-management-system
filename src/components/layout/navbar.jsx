import MainNavbar from "./mainNavbar";
import { Fragment } from "react";


const Navbar = (props) => {
    return (
        <Fragment>
            <MainNavbar />
            <main>
                {props.children}
            </main>
        </Fragment>
    );
};

export default Navbar;