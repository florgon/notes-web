import React from 'react';
import {Navigate} from 'react-router-dom'
import NotesListFetched from '../components/NotesListFetched';
import {useAuth} from '../contexts/AuthContext'

const NotesListPage = function() {
    const {isAuthenticated} = useAuth();
    
    if (!isAuthenticated){
        return (<Navigate to="/auth"/>)
    }
    
    return (
        <div className="__notes__list__page">
            <NotesListFetched/>
        </div>
    )
}

export default NotesListPage;