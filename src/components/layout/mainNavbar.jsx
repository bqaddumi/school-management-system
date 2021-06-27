import logo from '../../images/educationSchoolLogo.jpg';
import classes from './mainNavbar.module.css';
import { NavLink, useHistory } from 'react-router-dom';

const MainNavbar = () => {
    const history = useHistory();
    const logoutHandler = () => {
        history.push("/home");
    };
    return (
        <div className={classes.header}>
            <NavLink to='/home'>
                <div className={classes.logo}>Home</div>
            </NavLink>
            <ul className={classes.navContainerList}>
                <li className={classes.navList}>
                    <div>userName</div>
                </li>
                <li className={classes.navList}>
                    <img src={logo} alt="Logo" className={classes.image} />
                </li>
                <li className={classes.navList}>
                    <button onClick={logoutHandler}>Logout</button>
                </li>
                <li className={classes.navList}>
                    <NavLink to='/login'>Login</NavLink>
                </li>
                <li className={classes.navList}>
                    <NavLink to='/signup'>Signup</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default MainNavbar;