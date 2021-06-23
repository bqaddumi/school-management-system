import logo from '../../images/educationSchoolLogo.jpg';
import classes from './mainNavbar.module.css';

import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const MainNavbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const logoutHandler = () => {
        console.log("onClickLogoutHandler");
        setIsLoggedIn(!isLoggedIn);
    };
    return (
        <header className={classes.header}>
            <NavLink to='/home'>
                <div className={classes.logo}>Home</div>
            </NavLink>
            <ul>
                {isLoggedIn &&
                    <li>
                        <div>userName</div>
                    </li>
                }
                {isLoggedIn &&
                    <li>
                        <button onClick={logoutHandler}>Logout</button>
                    </li>
                }
                {isLoggedIn &&
                    <li>
                        <img src={logo} alt="Logo" className={classes.image} />
                    </li>
                }
                {!isLoggedIn &&
                    <li>
                        <NavLink to='/login'>Login</NavLink>
                    </li>
                }
                {!isLoggedIn &&
                    <li>
                        <NavLink to='/signup'>Signup</NavLink>
                    </li>
                }
            </ul>
        </header>
    );
};

export default MainNavbar;