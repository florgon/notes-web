// Libraries.
import React, {Fragment} from 'react';
import {Navigate} from 'react-router-dom';

// Auth context for checking is authenticated.
import {useAuth} from '../contexts/AuthContext';

const DissalowAuth = function() {
    /// @description Dissalow user to enter page if it is already authenticated, by redirect to note list page if authenticated.
    const {isAuthenticated} = useAuth();

    // Redirect to notes list page if authenticated.
    if (isAuthenticated) return (<Navigate to="/list"/>);

    return (<Fragment/>);
}

export default DissalowAuth;