// Libraries.
import React, {Fragment} from 'react';
import {Navigate} from 'react-router-dom';

// Auth context for checking is authenticated.
import {useAuth} from '../contexts/AuthContext';

const RequireAuth = function() {
    /// @description Requires auth from user, by redirect to auth page if not authenticated.
    const {isAuthenticated} = useAuth();

    // Redirect to auth page if not authenticated.
    if (!isAuthenticated) return (<Navigate to="/auth"/>);

    return (<Fragment/>);
}

export default RequireAuth;