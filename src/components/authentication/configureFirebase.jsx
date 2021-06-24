import React, { useState, useCallback } from 'react';

const AuthContext = React.createContext(
    {
        token: '',
        isLoggedIn: true,
        login: (token) => { },
        logout: () => { },
    }
);

export const AuthContextProvider = (props) => {
    let initialToken;

    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
    }, []);

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    };

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;