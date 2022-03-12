// Libraries.
import React from 'react';
import {Navigate} from 'react-router-dom';

// Auth context for logging out.
import {useAuth} from '../../contexts/AuthContext';

const AuthLogoutPage = function() {
    /// @description Logout page, will just logout and redirect to root.
    const {logout} = useAuth();

    logout();

    return (
        <Navigate to="/"/>
    )
}

export default AuthLogoutPage;