import React, {createContext, useEffect, useState} from 'react';
import Cookies from 'js-cookie';

// Notice!
// How cookies and some stuff is handled here is very bad!
// IK that!

const getAuthToken = function(){
    let token = Cookies.get("AUTH_TOKEN");
    return token;
}

const getIsAuthenticated = function() {
    return Cookies.get("AUTH_AUTHORIZED") == "true";
}

const AuthContext = createContext({});
const AuthProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState('');

    useEffect(() => {
        setIsAuthenticated(getIsAuthenticated());
        if (isAuthenticated){
            setAuthToken(getAuthToken());
        }
    }, []);

    const login = function (token){
        Cookies.set("AUTH_AUTHORIZED", "true");
        Cookies.set("AUTH_TOKEN", token);
        setIsAuthenticated(true);
    }

    const logout = function () {
        Cookies.set("AUTH_AUTHORIZED", "false");
        Cookies.set("AUTH_TOKEN", "");
        setIsAuthenticated(false);
    }

    const AuthData = {
        login,
        logout,

        isAuthenticated,
        authToken
    }

    return <AuthContext.Provider value={AuthData} {...props}/>
}


const useAuth = () => React.useContext(AuthContext);
export {
    AuthProvider, useAuth, 
    getAuthToken, getIsAuthenticated
}