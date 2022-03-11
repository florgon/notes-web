import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';

const AuthLoginPage = function() {
    const {logout} = useAuth();

    logout();

    return (<Navigate to="/"/>)
}
export default AuthLoginPage;