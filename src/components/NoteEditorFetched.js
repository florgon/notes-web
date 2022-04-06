// Libraries.
import React from 'react';
import {withTranslation} from 'react-i18next';

// Base note editor component.
import NoteEditor from './NoteEditor';

// API for fetching / updating.
import {ApiComponent, apiRequest} from './Api';


class NoteEditorFetched extends ApiComponent{
    /// @description Fetched with API note editor component.
    constructor(props){
        super(props);

        // API component method (fetch note).
        this.method = "notes/get";
        this.params = "id=" + this.props.id;

        // Messages.
        this.error_message = {text: this.props.t("error-occured"), className: "text-danger"};
        this.empty_message = {text: this.props.t("error-occured"), className: "text-danger"};
        this.loading_message = {text: this.props.t("loading"), className: "text-muted"};
    }

    render_body(result, message){
        /// @description Rendering body with ApiComponent supplied data.

        // Get note data from result.
        const note = result ? result.note : undefined;

        const onSaveNote = function (text){
            /// @description Note save handler. Saves note text on server side with API.
            let params = new URLSearchParams();
            params.set("id", this.props.id);
            params.set("text", text);

            apiRequest("notes/edit", params.toString(), () => {
                this.fetchAgain();
            });
        }.bind(this);

        // TODO: Maybe, this should be not on this layer of abstraction.
        if (!note){
            return (
                <div className="text-center display-6">
                    <div className={message.className}>{message.text}</div>
                </div>
            )
        }

        return (
            <NoteEditor 
                id={note.id} currentText={note.text}
                createdAt={note.created_at} updatedAt={note.updated_at}
                onSaveNote={onSaveNote}
                message={message}
            />
        );
    }
}

export default withTranslation()(NoteEditorFetched);