// Libraries.
import React, {Fragment, useCallback, useState} from 'react';
import {t} from 'i18next';
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next';


const NoteEditorHeader = function({id, createdAt, updatedAt, t}){
    /// @description Note editor header with note information.
  
    // Is note changed?
    const wasChanged = !dateIsSame(createdAt, updatedAt);
  
    return (
      <div className="card-header">
        <div className="display-6 text-center">
          <div className="link-secondary">
            {t("note-id")}{id}
          </div>
        </div>
  
        <div className="text-muted text-center">{t("note-created-at")}{convertDate(createdAt)}</div>
        <div className="text-muted text-center">
          {!wasChanged && <Fragment>{t("note-not-changed")}</Fragment>}
          {wasChanged && <Fragment>{t("note-updated-at")}{convertDate(updatedAt)}</Fragment>}
        </div>
      </div>
    )
}

const NoteEditorBody = function({text, setText, handleDrop}){
    /// @description Body of the not with text.
    return (
      <div className="card-body">
          <small className="text-muted">{t("markdown-supported")}</small>
          <br></br>
          <span className="text-danger">{t("editor-wip")}</span>
          <textarea onDrop={handleDrop} value={text} className="form-control mt-2" rows={10} onChange={(e) => {setText(e.target.value)}}/>
      </div>
    )
}

const NoteEditorFooter = function({text, defaultText, t, saveEdit, cancelEdit}){
    /// @description Note footer with buttons.
  
    // May note be saved or not?
    const noteMaySaved = (text.length > 0 && text !== defaultText);
  
    return (
      <div className="card-footer">
        {!noteMaySaved && <button className="btn btn-primary" disabled>{t("save-note")}</button>}
        {noteMaySaved && <button className="btn btn-primary" onClick={saveEdit}>{t("save-note")}</button>}
        &nbsp;
        <button className="btn btn-warning" onClick={cancelEdit}>{t("cancel-note-edit")}</button>
        &nbsp;
        <Link className="btn btn-outline-secondary" to="/list">{t("back-to-list")}</Link>
      </div>
    )
  }

const NoteEditor = function({id, currentText, createdAt, updatedAt, onSaveNote}) {
    /// @description Full page note editor.

    // Usings.
    const {t} = useTranslation();

      // States.
    const [text, setText] = useState(currentText); // Currenty displayed text.
    const [defaultText, setDefaultText] = useState(currentText); // Default text for canceling editing.

    const saveEdit = useCallback(() => {
        /// @decription Note save edit changes.
        if (text.length === 0){
          // Dissalow to save empty note and raise resetting to default text.
          return false && setText(defaultText);
        }
    
        if (text === defaultText){
          // Not required to save not changed note.
          return false;
        }
    
        // Save note.
        onSaveNote(text);
        setDefaultText(text);
    }, [text, setText, defaultText, setDefaultText, onSaveNote]);
    
    const cancelEdit = useCallback(() => {
      /// @description Note cancel edit changes.
      setText(defaultText);
    }, [setText, setDefaultText]);
    
    const _handleDrop = useCallback((e) => {
      /// @description Drop handle wrapper.
  
      // Handle link.
      let dataLink = e.dataTransfer.getData("text/uri-list");
      if (dataLink){
        let markdownLink = `[${dataLink}](${dataLink})`;
        setText(text + markdownLink);
        return true;
      }
  
      // Unable to handle this type of event.
      return false;
    }, [setText]);
  
    const handleDrop = useCallback((e) => {
      /// @description Handles drop event when there is something drag and dropped on note body.
  
      if (_handleDrop(e)){
        // Prevent default d&d event.
        e.stopPropagation();
        e.preventDefault();
      }
    }, [_handleDrop]);
    
    return (<>
        <div className="card shadow">
            <NoteEditorHeader id={id} t={t}
                createdAt={createdAt} updatedAt={updatedAt}/>
            <NoteEditorBody 
                text={text} defaultText={defaultText}
                setText={setText} handleDrop={handleDrop}/>
            <NoteEditorFooter t={t} text={text} defaultText={defaultText}
                saveEdit={saveEdit} cancelEdit={cancelEdit}
            />
        </div>
    </>);
}

const convertDate = function(timestamp){
    /// @description Converts date to human string.
    return new Date(timestamp).toLocaleDateString("en-GB", {
        "hour": "2-digit",
        "minute": "2-digit"
    });
}

const dateIsSame = (timestampA, timestampB) => {
    /// @description Date is same when difference in minutes is less than 0.1.
    let difference = (new Date(timestampA).getTime() - new Date(timestampB).getTime()) / 1000;
    return Math.abs(difference) < 1;
}

export default NoteEditor;