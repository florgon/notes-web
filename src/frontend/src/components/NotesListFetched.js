import React from 'react';
import NotesList from './NotesList';
import ApiComponent from './Api';

class NotesListFetched extends ApiComponent{
    constructor(props){
        super(props);

        this.method = "notes/list";
        this.error_message = {text: "Error: ", className: "text-danger"};
        this.empty_message = {text: "No notes yet!", className: "text-warning"};
        this.loading_message = {text: "Loading...", className: "text-muted"};
    }

    render_body(result, message){
        const notes = result ? result.notes : [];
        return (<NotesList title="Your notes" subtitle="(Only you see those notes!)" notes={notes} text={message}/>);
    }
}

export default NotesListFetched;