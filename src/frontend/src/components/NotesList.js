// Libraries.
import React, {useState, useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

// Base components.
import Note from './Note';
import Alert from './Alert';


const NotesList = function({currentNotes, onDeleteNote, onSaveNote, title, subtitle, text}){
    /// @description Notes list. Displays list of notes.

    // Usings.
    const {t} = useTranslation();

    // States.
    const [notes, setNotes] = useState({});
    const [alertPopup, setAlertPopup] = useState({open: false});
    
    // Setting notes from props.
    useEffect(() => {
        setNotes(currentNotes);
    }, [currentNotes])

    // Popup.
    const openPopup = function(text, type){
        /// @description Opens popup.
        setAlertPopup({
            open: true, text, type
        })
    }

    const onDeleteNoteWrapper = function(id){
        /// @description Delete note handler. Deletes note from lists, and showing popup.
        setNotes(notes.filter((item) => item.note.id !== id));
        if (onDeleteNote) onDeleteNote(id);
        openPopup(t("note-deleted"));
    }

    const onSaveNoteWrapper = function(id, text){
        /// @description Save note handler. Saves note in list, and showing popup.
        if (onSaveNote) onSaveNote(id, text);
        openPopup(t("note-saved"));
    }

    // Opening note created popup if there is hash link in url.
    useEffect(() => {
        if (window.location.href.includes("#new-note")){
            window.history.replaceState(null, "", window.location.href.replace("#new-note", ""))
            openPopup(t("note-created"));
        }
    })

    return (
        <Fragment>
            <div className="row">
                <span className="text-center display-3">{title}</span>
                <span className="text-center text-muted">{subtitle}</span>
            </div>
            <hr className="w-25 mx-auto"/>

            <div className="mx-auto text-center mb-3">
                <Link className="btn btn-lg btn-success" to="/create/">{t("new-note")}</Link>
            </div>

            <div className="w-50 mx-auto">
                {alertPopup.open && <Alert text={alertPopup.text} type={alertPopup.type}/>}
            </div>

            {notes.length > 0 && 
                <div className="w-75 mx-auto">
                    {notes.map((note) =>
                        <div className="mb-4" key={note.note.id}>
                            <Note
                                onDeleteNote={onDeleteNoteWrapper} onSaveNote={onSaveNoteWrapper}
                                id={note.note.id} currentText={note.note.text}
                                createdAt={note.note.created_at} updatedAt={note.note.updated_at}
                            />
                        </div>
                    )}
                </div>
            }

            {notes.length === 0 && !alertPopup.open && 
                <div className="text-center display-6">
                    <div className={text.className}>{text.text}</div>
                </div>
            }
        </Fragment>
    )
}

export default NotesList;