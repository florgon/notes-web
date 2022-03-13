// Libraries.
import React, {useEffect} from 'react';
import {useNavigate, Navigate} from 'react-router-dom'
import {useTranslation} from 'react-i18next';

// API for requesting API auth methods.
import {apiRequest} from '../components/Api';

// Checking if user is authenticated for redirect.
import {useAuth} from '../contexts/AuthContext'


const CreateNotePage = function() {
    /// @description Page with notes list.
    const {t} = useTranslation();
    const navivate = useNavigate();

    useEffect(() => {
        let params = "text=" + t("new-note-text");
        apiRequest("notes/create", params, () => {
            navivate("/list/#new-note");
        }, () => {
            navivate("/list/#new-note");
        });
    });

    // Redirect to auth if not already authenticated.
    const {isAuthenticated} = useAuth();
    if (!isAuthenticated) return (<Navigate to="/auth"/>)


    return (<div></div>)
}

export default CreateNotePage;