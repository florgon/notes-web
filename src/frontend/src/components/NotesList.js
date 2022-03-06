import React, {useState} from 'react';

import Note from './Note';
import Alert from './Alert';

const NotesList = function(props){
    const [notes, setNotes] = useState({...props.notes});
    const [alertPopup, setAlertPopup] = useState({open: false});
    React.useEffect(() => {
        setNotes(props.notes);
    }, [props.notes])
  
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
        openPopup("Note successfully deleted!");
    }

    return (
        <div className="__notes__list__">
            <div className="row">
                <span className="__notes__list__title text-center display-3">{props.title}</span>
                <span className="__notes__list__title text-center text-muted">{props.subtitle}</span>
            </div>
            <hr className="w-25 mx-auto"/>
     
            {
                <div className="__notes__list__alert__ w-25 mx-auto">
                    {alertPopup.open &&
                        <Alert text={alertPopup.text} type={alertPopup.type} classes=""/>
                    }
                </div>
            }

            {notes.length > 0 && 
                <div className="__notes__list__notes__ w-50 mx-auto">
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