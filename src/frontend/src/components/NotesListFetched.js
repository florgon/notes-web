// Libraries.
import React from 'react';
import {withTranslation} from 'react-i18next';

// Base notes list component.
import NotesList from './NotesList';

// API for fetching / updating.
import {apiRequest, ApiComponent} from './Api';


class NotesListFetched extends ApiComponent{
    /// @description Fetched with API notes list component.
    constructor(props){
        super(props);

        // API component method (fetch notes).
        this.method = "notes/list";
        // Messages.
        this.error_message = {text: this.props.t("error-occured"), className: "text-danger"};
        this.empty_message = {text: this.props.t("notes-empty"), className: "text-warning"};
        this.loading_message = {text: this.props.t("loading"), className: "text-muted"};

    }

    render_body(result, message){
        /// @description Rendering body with ApiComponent supplied data.

        // Get notes list from result.
        const notes = result ? result.notes : [];

        const onDeleteNote = function(id){
            /// @description Note delete handler. Deletes note from result list and apply on server side with API.
            result.notes = result.notes.filter((item) => item.note.id !== id);
            apiRequest("notes/delete", "id=" + id);
        }

        const onSaveNote = function (id, text){
            /// @description Note save handler. Saves note text on server side with API.
            let params = new URLSearchParams();
            params.set("id", id);
            params.set("text", text);

            apiRequest("notes/edit", params.toString(), () => {
                this.fetchAgain();
            });
        }.bind(this);

        const onUnpinNote = function(id){
            apiRequest("notes/unpin", "id=" + id);
        }

        const onPinNote = function(id){
            apiRequest("notes/pin", "id=" + id);
        }

        return (
            <NotesList 
                currentNotes={notes} text={message}
                onDeleteNote={onDeleteNote} onSaveNote={onSaveNote} onPinNote={onPinNote} onUnpinNote={onUnpinNote}
                title={this.props.t("your-notes")} subtitle={this.props.t("only-you-see-those-notes")} 
            />
        );
    }
}

export default withTranslation()(NotesListFetched);