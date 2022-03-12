/// WIP. Not refactored.
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Note from './Note';
import Alert from './Alert';
import { useTranslation } from 'react-i18next';

const NotesList = function(props){
    const {t} = useTranslation();
    const [notes, setNotes] = useState({...props.notes});
    const [alertPopup, setAlertPopup] = useState({open: false});

    const openPopup = function(text, type){
        setAlertPopup({
            open: true,
            text, type
        })
        // For now, there is no popup hiding required, as there a no animations.
        //setTimeout(() => setAlertPopup({open: false}), 3000)
    }
    const onDeleteNote = function(id, e){
        setNotes(notes.filter((item) => item.note.id !== id));
        if (props.onDeleteNote) props.onDeleteNote(id);
        openPopup(t("note-deleted"));
    }

    useEffect(() => {
        setNotes(props.notes);
    }, [props.notes])

    useEffect(() => {
        if (window.location.href.includes("#new-note")){
            window.history.replaceState(null, "", window.location.href.replace("#new-note", ""))
            openPopup(t("note-created"));
        }
    })

    return (
        <div className="__notes__list__">
            <div className="row">
                <span className="__notes__list__title text-center display-3">{props.title}</span>
                <span className="__notes__list__title text-center text-muted">{props.subtitle}</span>
            </div>

            
            <hr className="w-25 mx-auto"/>
            <div className="mx-auto text-center mb-3">
                <Link className="btn btn-lg btn-success" to="/create/">{t("new-note")}</Link>
            </div>
            {
                <div className="w-50 mx-auto">
                    {alertPopup.open &&
                        <Alert text={alertPopup.text} type={alertPopup.type}/>
                    }
                </div>
            }

            {notes.length > 0 && 
                <div className="__notes__list__notes__ w-75 mx-auto">
                    {notes.map((note) =>
                        <div className="mb-4" key={note.note.id}>
                            <Note 
                                onDeleteNote={onDeleteNote} 
                                text={note.note.text} id={note.note.id} 
                                created_at={note.note.created_at} updated_at={note.note.updated_at}
                            />
                        </div>
                    )}
                </div>
            }

            {notes.length === 0 && 
                <div className="__notes__list__text text-center display-6">
                    <div className={props.text.className}>
                        {props.text.text}
                    </div>
                </div>
            }
        </div>
    )
}

export default NotesList;