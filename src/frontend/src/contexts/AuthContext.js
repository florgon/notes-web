// Libraries.
import React, {createContext, useEffect, useState} from 'react';
import Cookies from 'js-cookie';


// Warning.
// The way, how cookies handled here is messy and bad,
// I know that, and may fix that later.
// Also there is some problems under naming...


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
        }
    }, [isAuthenticated]);

    const login = function (authToken){
        /// @description Logins user under given auth token.
        Cookies.set("AUTH_AUTHORIZED", "true");
        Cookies.set("AUTH_TOKEN", authToken);
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