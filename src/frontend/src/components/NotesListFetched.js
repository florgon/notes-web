import React from 'react';
import NotesList from './NotesList';
import ApiComponent, {apiRequest} from './Api';
import {withTranslation} from 'react-i18next';

class NotesListFetched extends ApiComponent{
    constructor(props){
        super(props);

        this.method = "notes/list";
        this.error_message = {text: this.props.t("error-occured"), className: "text-danger"};
        this.empty_message = {text: this.props.t("notes-empty"), className: "text-warning"};
        this.loading_message = {text: this.props.t("loading"), className: "text-muted"};
    }

    render_body(result, message){
        const notes = result ? result.notes : [];
        const onDeleteNote = function(id){
            result.notes = result.notes.filter((item) => item.note.id !== id);
            apiRequest("notes/delete", "id=" + id);
        }
        return (<NotesList 
            onDeleteNote={onDeleteNote}
            title={this.props.t("your-notes")} subtitle={this.props.t("only-you-see-those-notes")} notes={notes} text={message}
        />);
    }
}

export default withTranslation()(NotesListFetched);