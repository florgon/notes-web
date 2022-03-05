import React from 'react';

import Note from './Note';

const NotesList = function(props) {
    return (
        <div className="__notes__list__">
            <div className="row">
                <span className="__notes__list__title text-center display-1">{props.title}</span>
            </div>
            <hr className="w-75 mx-auto"/>

            {props.notes.length > 0 && 
                <div className="__notes__list__notes__ w-50 mx-auto">
                    {props.notes.map((note) =>
                        <div className="mb-4" key={note.note.id}>
                            <Note text={note.note.text} created_at={note.note.created_at}/>
                        </div>
                    )}
                </div>
            }

            {props.notes.length === 0 && 
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