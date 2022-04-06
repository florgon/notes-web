// Libraries.
import React from 'react';
import {Navigate} from 'react-router-dom'
import {useTranslation} from 'react-i18next';

// Components.
import NotesListFetched from '../../components/NotesListFetched';

// Checking if user is authenticated for redirect.
import {useAuth} from '../../contexts/AuthContext'


const NotesListPage = function() {
    /// @description Page with notes list.
    const {t} = useTranslation();

    // Redirect to auth if not already authenticated.
    const {isAuthenticated} = useAuth();
    if (!isAuthenticated) return (<Navigate to="/auth"/>)
    
    document.title = t("page-title-notes-list");
    return (
        <NotesListFetched/>
    )
}

export default NotesListPage;