// Libraries.
import React, {createContext, useEffect, useState} from 'react';
import Cookies from 'js-cookie';


// Warning.
// The way, how cookies handled here is messy and bad,
// I know that, and may fix that later.
// Also there is some problems under naming...

// In how much time auth cookies should expire.
const AUTH_COOKIES_EXPIRES = 365;

const getAuthToken = function(){
    /// @description Returns auth token from cookies.
    let authToken = Cookies.get("AUTH_TOKEN");
    return authToken;
}

const getIsAuthenticated = function() {
    /// @description Returns is user authenticated or not from cookies.
    let isAuthenticated = Cookies.get("AUTH_AUTHORIZED");
    isAuthenticated = (isAuthenticated === "true"); // Shitty way. IK.
    return isAuthenticated;
}

const AuthContext = createContext({});
const AuthProvider = (props) => {
    // Auth states.
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState("");

    // Reading auth context from cookies.
    useEffect(() => {
        setIsAuthenticated(getIsAuthenticated());
        if (isAuthenticated){
            setAuthToken(getAuthToken());
            console.log("Successfully authenticated via auth context!");
        }
    }, [isAuthenticated]);

    const login = function (authToken){
        /// @description Logins user under given auth token.
        Cookies.set("AUTH_AUTHORIZED", "true", { expires: AUTH_COOKIES_EXPIRES });
        Cookies.set("AUTH_TOKEN", authToken, { expires: AUTH_COOKIES_EXPIRES });
        setIsAuthenticated(true);
    }

    const logout = function () {
        /// @description Logouts user and removes it data.
        Cookies.set("AUTH_AUTHORIZED", "false");
        Cookies.set("AUTH_TOKEN", "");
        setIsAuthenticated(false);
    }

    const authContext = {
        // Functions.
        login, logout,

        // States.
        isAuthenticated, authToken
    }

    return (
        <AuthContext.Provider value={authContext} {...props}/>
    )
}
const useAuth = () => React.useContext(AuthContext);


export {
    AuthProvider, useAuth, 
    getAuthToken, getIsAuthenticated,
}