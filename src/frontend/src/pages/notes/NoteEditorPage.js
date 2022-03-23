// Libraries.
import React, {useEffect, useState} from 'react';
import {Navigate, useSearchParams} from 'react-router-dom'
import {useTranslation} from 'react-i18next';


// Components.
import NoteEditorFetched from '../components/NoteEditorFetched';

// Checking if user is authenticated for redirect.
import {useAuth} from '../contexts/AuthContext'


const NoteEditorPage = function() {
    /// @description Note full scale editor page.

    const [noteId, setNoteId] = useState(undefined);

    // Usings.
    const {t} = useTranslation();
    const [searchParams] = useSearchParams();

    // Try fetch ID.
    useEffect(() => {
        let noteId = parseInt(searchParams.get("id"));
        if (isNaN(noteId)){
            setNoteId(null);
            return;
        }
        setNoteId(noteId);
    }, [setNoteId]);
   
    // Redirect to auth if not already authenticated.
    const {isAuthenticated} = useAuth();
    if (!isAuthenticated) return (<Navigate to="/auth"/>)
    if (noteId === null) return (<Navigate to="/list"/>)

    document.title = t("page-title-note-editor");
    return (<>
        {noteId !== undefined && <NoteEditorFetched id={noteId}/>}
    </>)
}

export default NoteEditorPage;