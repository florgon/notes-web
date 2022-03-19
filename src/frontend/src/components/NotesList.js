// Libraries.
import React, {useState, useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

// Base components.
import Note from './Note';
import Alert from './Alert';
import SettingsListViewDropdown from './SettingsListViewDropdown'
import {getNotesListViewAsGrid, useSettings} from '../contexts/SettingsContext'


const NotesList = function({currentNotes, onDeleteNote, onSaveNote, onPinNote, onUnpinNote, title, subtitle, text}){
    /// @description Notes list. Displays list of notes.

    // Usings.
    const {t} = useTranslation();
    const settings = useSettings()

    // States.
    const [notes, setNotes] = useState([]);
    const [alertPopup, setAlertPopup] = useState({open: false});
    
    // Setting notes from props.
    useEffect(() => {
        setNotes(currentNotes);
    }, [currentNotes])

    const sortWithOrdering = function(){
        /// @description Returns two arrays, with pinned notes, and unpinned. Should be used as first rendering pinned notes, then unpinned.

        // TODO: Later this will be reworked to sortering with custom levels.
        let notesUnpinned = notes.filter((item) => !item.note.sorting.is_pinned);
        let notesPinned = notes.filter((item) => item.note.sorting.is_pinned)
        return [notesPinned, notesUnpinned];
    }

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

    const onPinNoteWrapper = function(id){
        /// @description Pin note handler. Pins note to the top.
        if (onPinNote) onPinNote(id);
    }

    const onUnpinNoteWrapper = function(id){
        /// @description Unpin note handler. Unpins note from the top.
        if (onUnpinNote) onUnpinNote(id);
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

    let notesListViewAsGrid = getNotesListViewAsGrid();
    let [notesPinned, notesUnpinned] = sortWithOrdering();
    return (
        <Fragment>
            <div className="row">
                <span className="text-center display-3">{title}</span>
                <span className="text-center text-muted">{subtitle}</span>
            </div>
            <hr className="w-25 mx-auto"/>

            <div className="mx-auto text-center mb-3">
                <Link className="btn btn-lg btn-success" to="/create">{t("new-note")}</Link>
                {false && 
                    <SettingsListViewDropdown className="" size="md" t={t} settings={settings}/>
                }
            </div>

            <div className="w-50 mx-auto">
                {alertPopup.open && <Alert text={alertPopup.text} type={alertPopup.type}/>}
            </div>

            {notes.length > 0 && <Fragment>
                {notesListViewAsGrid && <Fragment>
                    {/* Will be refactored later to sorting system. */}
                    {notesPinned.length > 0 && 
                        <div className="row">
                            {notesPinned.map((note) =>
                                <div className="col-4 mb-4" key={note.note.id}>
                                    <Note
                                        onDeleteNote={onDeleteNoteWrapper} onSaveNote={onSaveNoteWrapper} onUnpinNote={onUnpinNoteWrapper} onPinNote={onPinNoteWrapper}
                                        id={note.note.id} currentText={note.note.text}
                                        currentIsPinned={note.note.sorting.is_pinned}
                                        createdAt={note.note.created_at} updatedAt={note.note.updated_at}
                                    />
                                </div>
                            )}
                        </div>
                    }

                    {/* Will be refactored later to sorting system. */}
                    {notesUnpinned.length > 0 && 
                        <div className="row">
                            {notesUnpinned.map((note) =>
                                <div className="col-4 mb-4" key={note.note.id}>
                                    <Note
                                        onDeleteNote={onDeleteNoteWrapper} onSaveNote={onSaveNoteWrapper} onUnpinNote={onUnpinNoteWrapper} onPinNote={onPinNoteWrapper}
                                        id={note.note.id} currentText={note.note.text}
                                        currentIsPinned={note.note.sorting.is_pinned}
                                        createdAt={note.note.created_at} updatedAt={note.note.updated_at}
                                    />
                                </div>
                            )}
                        </div>
                    }
                </Fragment>}

                {!notesListViewAsGrid && <Fragment>
                    {/* Will be refactored later to sorting system. */}
                    {notesPinned.length > 0 && 
                        <div className="w-75 mx-auto">
                            {notesPinned.map((note) =>
                                <div className="mb-4" key={note.note.id}>
                                    <Note
                                        onDeleteNote={onDeleteNoteWrapper} onSaveNote={onSaveNoteWrapper} onUnpinNote={onUnpinNoteWrapper} onPinNote={onPinNoteWrapper}
                                        id={note.note.id} currentText={note.note.text}
                                        currentIsPinned={note.note.sorting.is_pinned}
                                        createdAt={note.note.created_at} updatedAt={note.note.updated_at}
                                    />
                                </div>
                            )}
                        </div>
                    }

                    {/* Will be refactored later to sorting system. */}
                    {notesUnpinned.length > 0 && 
                        <div className="w-75 mx-auto">
                            {notesUnpinned.map((note) =>
                                <div className="mb-4" key={note.note.id}>
                                    <Note
                                        onDeleteNote={onDeleteNoteWrapper} onSaveNote={onSaveNoteWrapper} onUnpinNote={onUnpinNoteWrapper} onPinNote={onPinNoteWrapper}
                                        id={note.note.id} currentText={note.note.text}
                                        currentIsPinned={note.note.sorting.is_pinned}
                                        createdAt={note.note.created_at} updatedAt={note.note.updated_at}
                                    />
                                </div>
                            )}
                        </div>
                    }
                </Fragment>}
            </Fragment>}

            {notes.length === 0 && !alertPopup.open && 
                <div className="text-center display-6">
                    <div className={text.className}>{text.text}</div>
                </div>
            }
        </Fragment>
    )
}

export default NotesList;